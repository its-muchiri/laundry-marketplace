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
import { Rider } from '../../riders/entities/rider.entity';
import { LegKind } from '@laundry/shared';

@Entity('order_legs')
@Index(['orderId'])
@Index(['riderId'])
export class OrderLeg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @ManyToOne(() => Order, order => order.legs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'enum', enum: LegKind })
  kind: LegKind;

  @Column({ nullable: true, name: 'rider_id' })
  riderId?: string;

  @ManyToOne(() => Rider)
  @JoinColumn({ name: 'rider_id' })
  rider?: Rider;

  @Column({ type: 'int', name: 'road_distance_meters' })
  roadDistanceMeters: number;

  @Column({ type: 'int', name: 'fee_cents' })
  feeCents: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';

  @Column({ nullable: true, name: 'assigned_at', type: 'timestamp' })
  assignedAt?: Date;

  @Column({ nullable: true, name: 'started_at', type: 'timestamp' })
  startedAt?: Date;

  @Column({ nullable: true, name: 'completed_at', type: 'timestamp' })
  completedAt?: Date;

  @Column({ type: 'jsonb', nullable: true, name: 'pickup_coordinates' })
  pickupCoordinates?: { latitude: number; longitude: number };

  @Column({ type: 'jsonb', nullable: true, name: 'dropoff_coordinates' })
  dropoffCoordinates?: { latitude: number; longitude: number };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
