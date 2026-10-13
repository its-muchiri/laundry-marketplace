import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { PaymentType } from '@laundry/shared';

@Entity('payments')
@Index(['orderId'])
@Index(['idempotencyKey'], { unique: true })
@Index(['providerRef'])
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ type: 'enum', enum: PaymentType })
  type: PaymentType;

  @Column({ type: 'int', name: 'amount_cents' })
  amountCents: number;

  @Column({ name: 'provider_ref' })
  providerRef: string;

  @Column({ unique: true, name: 'idempotency_key' })
  idempotencyKey: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'failed' | 'refunded';

  @Column({ type: 'jsonb', nullable: true, name: 'callback_data' })
  callbackData?: Record<string, any>;

  @Column({ nullable: true, name: 'failed_reason' })
  failedReason?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
