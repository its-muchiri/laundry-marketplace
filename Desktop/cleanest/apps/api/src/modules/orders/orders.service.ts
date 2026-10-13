import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderLeg } from './entities/order-leg.entity';
import { OrderEvent } from './entities/order-event.entity';
import { ServiceItem } from '../providers/entities/service-item.entity';
import { Provider } from '../providers/entities/provider.entity';
import { RidersService } from '../riders/riders.service';
import { UsersService } from '../users/users.service';
import {
  OrderState,
  UserRole,
  LegKind,
  OrderEventType,
  ServiceCategory,
  VerificationStatus,
  ORDER_STATE_TRANSITIONS,
  ALLOWED_ACTORS,
  PRICE_VARIANCE_THRESHOLD,
  PROVIDER_COMMISSION_RATE,
  DELIVERY_FEE_PLATFORM_SHARE_MIN,
  DEFAULT_DELIVERY_BASE_FEE,
  DEFAULT_DELIVERY_PER_KM_RATE,
  DEFAULT_PEAK_SURCHARGE,
  DEFAULT_SERVICE_FEE,
  DISPATCH_OFFER_TIMEOUT_MS,
} from '@laundry/shared';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(OrderLeg)
    private orderLegRepository: Repository<OrderLeg>,
    @InjectRepository(OrderEvent)
    private orderEventRepository: Repository<OrderEvent>,
    @InjectRepository(ServiceItem)
    private serviceItemRepository: Repository<ServiceItem>,
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    private ridersService: RidersService,
    private usersService: UsersService,
    private dataSource: DataSource,
  ) {}

  async findById(id: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: [
        'customer',
        'provider',
        'items',
        'items.serviceItem',
        'legs',
        'legs.rider',
        'events',
      ],
    });
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customerId },
      relations: ['provider', 'items', 'items.serviceItem', 'legs'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByProviderId(providerId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { providerId },
      relations: ['customer', 'items', 'items.serviceItem', 'legs'],
      order: { createdAt: 'DESC' },
    });
  }

  async createOrder(createOrderDto: any, customerId: string): Promise<Order> {
    return this.dataSource.transaction(async manager => {
      // Validate provider exists and is approved
      const provider = await manager.findOne(Provider, {
        where: { id: createOrderDto.providerId },
        relations: ['serviceItems'],
      });
      if (!provider) {
        throw new NotFoundException('Provider not found');
      }
      if (provider.verificationStatus !== VerificationStatus.APPROVED) {
        throw new BadRequestException('Provider is not accepting orders');
      }

      // Validate service items exist and calculate prices
      let laundrySubtotal = 0;
      const orderItems: Partial<OrderItem>[] = [];

      for (const itemDto of createOrderDto.items) {
        const serviceItem = await manager.findOne(ServiceItem, {
          where: { id: itemDto.serviceItemId, providerId: provider.id, isActive: true },
        });
        if (!serviceItem) {
          throw new NotFoundException(`Service item ${itemDto.serviceItemId} not found`);
        }

        const priceCents = serviceItem.priceCents * itemDto.quantity;
        laundrySubtotal += priceCents;

        orderItems.push({
          serviceItemId: serviceItem.id,
          quantity: itemDto.quantity,
          weightKg: itemDto.weightKg,
          priceCents,
          unit: serviceItem.unit,
        });
      }

      // Calculate delivery fee (both legs)
      const pickupLeg = await this.calculateDeliveryFee(
        createOrderDto.pickupCoordinates,
        { latitude: provider.facilityLatitude, longitude: provider.facilityLongitude },
        createOrderDto.isPeak || false,
      );

      const returnLeg = await this.calculateDeliveryFee(
        { latitude: provider.facilityLatitude, longitude: provider.facilityLongitude },
        createOrderDto.deliveryCoordinates,
        createOrderDto.isPeak || false,
      );

      const deliveryFee = pickupLeg.feeCents + returnLeg.feeCents;

      // Calculate service fee
      const serviceFee = DEFAULT_SERVICE_FEE;

      const estimatedPriceCents = laundrySubtotal + deliveryFee + serviceFee;

      // Create order
      const order = manager.create(Order, {
        customerId,
        providerId: provider.id,
        state: OrderState.PLACED,
        estimatedPriceCents,
        approvalRequired: false,
        customerApproved: false,
        pickupCoordinates: createOrderDto.pickupCoordinates,
        deliveryCoordinates: createOrderDto.deliveryCoordinates,
        pickupLandmark: createOrderDto.pickupLandmark,
        deliveryLandmark: createOrderDto.deliveryLandmark,
        scheduledPickupAt: createOrderDto.scheduledPickupAt,
      });

      const savedOrder = await manager.save(order);

      // Save order items
      for (const item of orderItems) {
        const orderItem = manager.create(OrderItem, { ...item, orderId: savedOrder.id });
        await manager.save(orderItem);
      }

      // Save order legs
      const pickupLegEntity = manager.create(OrderLeg, {
        orderId: savedOrder.id,
        kind: LegKind.PICKUP,
        roadDistanceMeters: pickupLeg.distanceMeters,
        feeCents: pickupLeg.feeCents,
        status: 'pending',
        pickupCoordinates: createOrderDto.pickupCoordinates,
        dropoffCoordinates: {
          latitude: provider.facilityLatitude,
          longitude: provider.facilityLongitude,
        },
      });
      await manager.save(pickupLegEntity);

      const returnLegEntity = manager.create(OrderLeg, {
        orderId: savedOrder.id,
        kind: LegKind.RETURN,
        roadDistanceMeters: returnLeg.distanceMeters,
        feeCents: returnLeg.feeCents,
        status: 'pending',
        pickupCoordinates: {
          latitude: provider.facilityLatitude,
          longitude: provider.facilityLongitude,
        },
        dropoffCoordinates: createOrderDto.deliveryCoordinates,
      });
      await manager.save(returnLegEntity);

      // Log initial event
      await this.logEvent(
        manager,
        savedOrder.id,
        OrderState.PLACED,
        OrderState.PLACED,
        customerId,
        UserRole.CUSTOMER,
        {
          coordinates: createOrderDto.pickupCoordinates,
        },
      );

      const fullOrder = await this.findById(savedOrder.id);
      if (!fullOrder) {
        throw new NotFoundException('Order not found after creation');
      }
      return fullOrder;
    });
  }

  async transitionState(
    orderId: string,
    newState: OrderState,
    actorId: string,
    actorRole: UserRole,
    metadata?: any,
  ): Promise<Order> {
    const order = await this.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const allowedTransitions = ORDER_STATE_TRANSITIONS[order.state] || [];
    if (!allowedTransitions.includes(newState)) {
      throw new BadRequestException(`Invalid state transition from ${order.state} to ${newState}`);
    }

    const allowedActors = ALLOWED_ACTORS[newState] || [];
    if (!allowedActors.includes(actorRole) && !allowedActors.includes('system')) {
      throw new ForbiddenException(`Role ${actorRole} cannot trigger transition to ${newState}`);
    }

    // Special handling for price approval at weighed state
    if (order.state === OrderState.WEIGHED && newState === OrderState.PROCESSING) {
      if (order.approvalRequired && !order.customerApproved) {
        throw new BadRequestException('Customer must approve price change before processing');
      }
    }

    return this.dataSource.transaction(async manager => {
      const oldState = order.state;
      order.state = newState;
      await manager.save(order);

      // Log event
      await this.logEvent(manager, orderId, oldState, newState, actorId, actorRole, metadata);

      // Handle specific transitions
      if (newState === OrderState.RIDER_ASSIGNED && actorRole === UserRole.SYSTEM) {
        // Dispatch logic would go here
      }

      if (newState === OrderState.COMPLETED) {
        // Trigger payout after dispute window
      }

      const updatedOrder = await this.findById(orderId);
      if (!updatedOrder) {
        throw new NotFoundException('Order not found after transition');
      }
      return updatedOrder;
    });
  }

  async approvePriceChange(orderId: string, customerId: string): Promise<Order> {
    const order = await this.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.customerId !== customerId) {
      throw new ForbiddenException('Not your order');
    }
    if (!order.approvalRequired) {
      throw new BadRequestException('No approval required');
    }

    order.customerApproved = true;
    order.approvalRequired = false;
    await this.orderRepository.save(order);
    return order;
  }

  async updateFinalPrice(
    orderId: string,
    finalWeightKg: number,
    providerId: string,
  ): Promise<Order> {
    const order = await this.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.providerId !== providerId) {
      throw new ForbiddenException('Not your provider');
    }
    if (order.state !== OrderState.AT_PROVIDER && order.state !== OrderState.WEIGHED) {
      throw new BadRequestException('Order not at weighing stage');
    }

    // Calculate final price based on actual weight
    let laundrySubtotal = 0;
    for (const item of order.items) {
      if (item.unit === 'kg') {
        // Weight-based pricing
        laundrySubtotal += (item.priceCents / item.quantity) * finalWeightKg;
      } else {
        // Per-piece pricing stays the same
        laundrySubtotal += item.priceCents;
      }
    }

    // Delivery fee and service fee remain the same
    const deliveryFee = order.legs.reduce((sum, leg) => sum + leg.feeCents, 0);
    const serviceFee = DEFAULT_SERVICE_FEE;
    const finalPriceCents = laundrySubtotal + deliveryFee + serviceFee;

    const variance = (finalPriceCents - order.estimatedPriceCents) / order.estimatedPriceCents;

    order.finalPriceCents = finalPriceCents;
    order.approvalRequired = variance > PRICE_VARIANCE_THRESHOLD;
    order.customerApproved = !order.approvalRequired;

    await this.orderRepository.save(order);

    // Log price change event
    await this.logEvent(
      this.orderEventRepository.manager,
      orderId,
      order.state,
      order.state,
      providerId,
      UserRole.PROVIDER,
      { type: 'price_change', finalPriceCents, variance },
    );

    return order;
  }

  private async calculateDeliveryFee(
    from: { latitude: number; longitude: number },
    to: { latitude: number; longitude: number },
    isPeak: boolean,
  ): Promise<{ distanceMeters: number; feeCents: number }> {
    // TODO: Use Google Routes API for actual road distance
    // For now, use haversine distance as approximation
    const distanceMeters = this.haversineDistance(from, to);

    let feeCents = DEFAULT_DELIVERY_BASE_FEE;
    feeCents += Math.round((distanceMeters / 1000) * DEFAULT_DELIVERY_PER_KM_RATE);
    if (isPeak) {
      feeCents += DEFAULT_PEAK_SURCHARGE;
    }

    return { distanceMeters, feeCents };
  }

  private haversineDistance(
    from: { latitude: number; longitude: number },
    to: { latitude: number; longitude: number },
  ): number {
    const R = 6371000; // Earth radius in meters
    const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
    const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((from.latitude * Math.PI) / 180) *
        Math.cos((to.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private async logEvent(
    manager: any,
    orderId: string,
    fromState: OrderState,
    toState: OrderState,
    actorId: string,
    actorRole: UserRole,
    metadata?: any,
  ): Promise<OrderEvent> {
    const event = manager.create(OrderEvent, {
      orderId,
      fromState,
      toState,
      actorId,
      actorRole,
      type: metadata?.type || OrderEventType.STATE_CHANGE,
      coordinates: metadata?.coordinates,
      photoUrls: metadata?.photoUrls || [],
      itemCount: metadata?.itemCount,
      metadata,
    });
    return manager.save(event);
  }

  // Pricing helpers
  calculateProviderPayout(order: Order): number {
    const laundrySubtotal = order.items.reduce((sum, item) => sum + item.priceCents, 0);
    const commission = Math.round(laundrySubtotal * PROVIDER_COMMISSION_RATE);
    return laundrySubtotal - commission;
  }

  calculatePlatformDeliveryShare(order: Order): number {
    const deliveryFee = order.legs.reduce((sum, leg) => sum + leg.feeCents, 0);
    return Math.round(deliveryFee * DELIVERY_FEE_PLATFORM_SHARE_MIN);
  }

  calculateRiderPayout(order: Order): number {
    const deliveryFee = order.legs.reduce((sum, leg) => sum + leg.feeCents, 0);
    const platformShare = this.calculatePlatformDeliveryShare(order);
    return deliveryFee - platformShare;
  }
}
