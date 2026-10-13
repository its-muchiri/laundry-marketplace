import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Order } from './order.entity';
import { User } from '../../users/entities/user.entity';
import { OrderState, UserRole, OrderEventType } from '@laundry/shared';

@Entity('order_events')
@Index(['orderId'])
@Index(['actorId'])
export class OrderEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => Order, order => order.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'enum', enum: OrderState, name: 'from_state' })
  fromState: OrderState;

  @Column({ type: 'enum', enum: OrderState, name: 'to_state' })
  toState: OrderState;

  @Column({ name: 'actor_id' })
  actorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'actor_id' })
  actor: User;

  @Column({ type: 'enum', enum: UserRole, name: 'actor_role' })
  actorRole: UserRole;

  @Column({ type: 'enum', enum: OrderEventType, default: OrderEventType.STATE_CHANGE })
  type: OrderEventType;

  @Column({ type: 'jsonb', nullable: true, name: 'coordinates' })
  coordinates?: { latitude: number; longitude: number };

  @Column({ type: 'simple-array', default: [], name: 'photo_urls' })
  photoUrls: string[];

  @Column({ nullable: true, name: 'item_count', type: 'int' })
  itemCount?: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
