import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { OrderState } from '@laundry/shared';
import { OrderItem } from './order-item.entity';
import { OrderLeg } from './order-leg.entity';
import { OrderEvent } from './order-event.entity';

@Entity('orders')
@Index(['customerId'])
@Index(['providerId'])
@Index(['state'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'customer_id' })
  customerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column({ name: 'provider_id' })
  providerId: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column({ type: 'enum', enum: OrderState, default: OrderState.PLACED })
  state: OrderState;

  @Column({ type: 'int', name: 'estimated_price_cents' })
  estimatedPriceCents: number;

  @Column({ type: 'int', nullable: true, name: 'final_price_cents' })
  finalPriceCents?: number;

  @Column({ default: false, name: 'approval_required' })
  approvalRequired: boolean;

  @Column({ default: false, name: 'customer_approved' })
  customerApproved: boolean;

  @Column({ nullable: true, name: 'pickup_address_id' })
  pickupAddressId?: string;

  @Column({ nullable: true, name: 'delivery_address_id' })
  deliveryAddressId?: string;

  @Column({ type: 'jsonb', nullable: true, name: 'pickup_coordinates' })
  pickupCoordinates?: { latitude: number; longitude: number };

  @Column({ type: 'jsonb', nullable: true, name: 'delivery_coordinates' })
  deliveryCoordinates?: { latitude: number; longitude: number };

  @Column({ type: 'jsonb', nullable: true, name: 'pickup_landmark' })
  pickupLandmark?: string;

  @Column({ type: 'jsonb', nullable: true, name: 'delivery_landmark' })
  deliveryLandmark?: string;

  @Column({ nullable: true, name: 'scheduled_pickup_at', type: 'timestamp' })
  scheduledPickupAt?: Date;

  @Column({ nullable: true, name: 'estimated_delivery_at', type: 'timestamp' })
  estimatedDeliveryAt?: Date;

  @Column({ nullable: true, name: 'actual_pickup_at', type: 'timestamp' })
  actualPickupAt?: Date;

  @Column({ nullable: true, name: 'actual_delivery_at', type: 'timestamp' })
  actualDeliveryAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];

  @OneToMany(() => OrderLeg, leg => leg.order, { cascade: true })
  legs: OrderLeg[];

  @OneToMany(() => OrderEvent, event => event.order, { cascade: true })
  events: OrderEvent[];
}
