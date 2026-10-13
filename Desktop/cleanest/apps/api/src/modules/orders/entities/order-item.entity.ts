import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Order } from './order.entity';
import { ServiceItem } from '../../providers/entities/service-item.entity';
import { ServiceUnit } from '@laundry/shared';

@Entity('order_items')
@Index(['orderId'])
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ name: 'service_item_id' })
  serviceItemId: string;

  @ManyToOne(() => ServiceItem)
  @JoinColumn({ name: 'service_item_id' })
  serviceItem: ServiceItem;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: true, name: 'weight_kg' })
  weightKg?: number;

  @Column({ type: 'int', name: 'price_cents' })
  priceCents: number;

  @Column({ type: 'enum', enum: ServiceUnit })
  unit: ServiceUnit;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
