import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { LedgerEntry } from './entities/ledger-entry.entity';
import { PaymentType, OrderState, UserRole } from '@laundry/shared';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(LedgerEntry)
    private ledgerRepository: Repository<LedgerEntry>,
    private ordersService: OrdersService,
    private dataSource: DataSource,
  ) {}

  async initiatePayment(
    orderId: string,
    customerId: string,
  ): Promise<{ payment: Payment; stkPushRequest: any }> {
    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.customerId !== customerId) {
      throw new BadRequestException('Not your order');
    }
    if (order.state !== 'placed' && order.state !== 'accepted') {
      throw new BadRequestException('Order not in payable state');
    }

    const amountCents = order.finalPriceCents || order.estimatedPriceCents;
    const idempotencyKey = `payment_${orderId}_${Date.now()}`;

    // Check for existing pending payment
    const existing = await this.paymentRepository.findOne({
      where: { orderId, type: PaymentType.CHARGE, status: 'pending' },
    });
    if (existing) {
      return { payment: existing, stkPushRequest: this.buildStkPushRequest(existing) };
    }

    // Create payment record
    const payment = this.paymentRepository.create({
      orderId,
      type: PaymentType.CHARGE,
      amountCents,
      providerRef: '',
      idempotencyKey,
      status: 'pending',
    });
    await this.paymentRepository.save(payment);

    // Create ledger entry for hold
    await this.createLedgerEntry({
      orderId,
      paymentId: payment.id,
      account: 'escrow',
      debitCents: 0,
      creditCents: amountCents,
      reference: `Order ${orderId} payment hold`,
      idempotencyKey: `ledger_hold_${payment.id}`,
    });

    return { payment, stkPushRequest: this.buildStkPushRequest(payment) };
  }

  async handleMpesaCallback(callbackData: any): Promise<Payment> {
    const { CheckoutRequestID, ResultCode, ResultDesc, Amount, MpesaReceiptNumber } = callbackData;

    const payment = await this.paymentRepository.findOne({
      where: { providerRef: CheckoutRequestID },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (payment.status !== 'pending') {
      return payment; // Idempotent - already processed
    }

    if (ResultCode === 0) {
      // Success
      payment.status = 'completed';
      payment.providerRef = MpesaReceiptNumber || CheckoutRequestID;
      payment.callbackData = callbackData;
      await this.paymentRepository.save(payment);

      // Move from escrow to platform
      await this.createLedgerEntry({
        orderId: payment.orderId,
        paymentId: payment.id,
        account: 'escrow',
        debitCents: payment.amountCents,
        creditCents: 0,
        reference: `Order ${payment.orderId} payment captured`,
        idempotencyKey: `ledger_capture_${payment.id}`,
      });

      await this.createLedgerEntry({
        orderId: payment.orderId,
        paymentId: payment.id,
        account: 'platform',
        debitCents: 0,
        creditCents: payment.amountCents,
        reference: `Order ${payment.orderId} payment received`,
        idempotencyKey: `ledger_receive_${payment.id}`,
      });

      // Update order state if needed
      const order = await this.ordersService.findById(payment.orderId);
      if (order && order.state === 'placed') {
        await this.ordersService.transitionState(
          payment.orderId,
          OrderState.ACCEPTED,
          'system',
          UserRole.SYSTEM,
        );
      }
    } else {
      // Failed
      payment.status = 'failed';
      payment.failedReason = ResultDesc;
      payment.callbackData = callbackData;
      await this.paymentRepository.save(payment);

      // Release escrow hold
      await this.createLedgerEntry({
        orderId: payment.orderId,
        paymentId: payment.id,
        account: 'escrow',
        debitCents: payment.amountCents,
        creditCents: 0,
        reference: `Order ${payment.orderId} payment failed - hold released`,
        idempotencyKey: `ledger_release_${payment.id}`,
      });
    }

    return payment;
  }

  async releasePayouts(orderId: string): Promise<void> {
    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Calculate payouts
    const providerPayout = this.ordersService.calculateProviderPayout(order);
    const riderPayout = this.ordersService.calculateRiderPayout(order);

    // Provider payout
    await this.createPayout(orderId, order.providerId, 'provider', providerPayout);

    // Rider payouts (one per leg)
    for (const leg of order.legs) {
      if (leg.riderId) {
        const legPayout = Math.round(
          riderPayout * (leg.feeCents / order.legs.reduce((s, l) => s + l.feeCents, 0)),
        );
        await this.createPayout(orderId, leg.riderId, 'rider', legPayout, leg.id);
      }
    }

    // Platform revenue
    const platformDeliveryShare = this.ordersService.calculatePlatformDeliveryShare(order);
    const laundrySubtotal = order.items.reduce((sum, item) => sum + item.priceCents, 0);
    const providerCommission = Math.round(laundrySubtotal * 0.15);
    const platformRevenue = platformDeliveryShare + providerCommission;

    await this.createLedgerEntry({
      orderId,
      account: 'platform',
      debitCents: 0,
      creditCents: platformRevenue,
      reference: `Order ${orderId} platform revenue`,
      idempotencyKey: `ledger_platform_revenue_${orderId}`,
    });
  }

  private async createPayout(
    orderId: string,
    recipientId: string,
    recipientType: 'provider' | 'rider',
    amountCents: number,
    legId?: string,
  ): Promise<Payment> {
    const idempotencyKey = `payout_${orderId}_${recipientType}_${recipientId}_${legId || ''}`;

    // Check if already exists
    const existing = await this.paymentRepository.findOne({ where: { idempotencyKey } });
    if (existing) {
      return existing;
    }

    const payment = this.paymentRepository.create({
      orderId,
      type: PaymentType.PAYOUT,
      amountCents,
      providerRef: '',
      idempotencyKey,
      status: 'pending',
    });
    await this.paymentRepository.save(payment);

    // Ledger entry
    await this.createLedgerEntry({
      orderId,
      paymentId: payment.id,
      account: recipientType === 'provider' ? 'provider' : 'rider',
      debitCents: 0,
      creditCents: amountCents,
      reference: `Order ${orderId} ${recipientType} payout`,
      idempotencyKey: `ledger_payout_${payment.id}`,
    });

    // TODO: Trigger M-Pesa B2C payment
    // await this.triggerB2CPayment(payment, recipientPhone);

    return payment;
  }

  private async createLedgerEntry(data: {
    orderId: string;
    paymentId?: string;
    account: string;
    debitCents: number;
    creditCents: number;
    reference: string;
    idempotencyKey: string;
    metadata?: Record<string, any>;
  }): Promise<LedgerEntry> {
    const entry = this.ledgerRepository.create(data);
    return this.ledgerRepository.save(entry);
  }

  private buildStkPushRequest(payment: Payment): any {
    return {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: this.generatePassword(),
      Timestamp: this.generateTimestamp(),
      TransactionType: 'CustomerPayBillOnline',
      Amount: payment.amountCents / 100, // Convert to KES
      PartyA: '', // Customer phone - filled by frontend
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: '', // Customer phone - filled by frontend
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: payment.orderId,
      TransactionDesc: `Laundry order ${payment.orderId}`,
    };
  }

  private generatePassword(): string {
    // Base64 encoded: Shortcode + Passkey + Timestamp
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const timestamp = this.generateTimestamp();
    return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
  }

  private generateTimestamp(): string {
    const now = new Date();
    return (
      now.getFullYear().toString() +
      (now.getMonth() + 1).toString().padStart(2, '0') +
      now.getDate().toString().padStart(2, '0') +
      now.getHours().toString().padStart(2, '0') +
      now.getMinutes().toString().padStart(2, '0') +
      now.getSeconds().toString().padStart(2, '0')
    );
  }
}
