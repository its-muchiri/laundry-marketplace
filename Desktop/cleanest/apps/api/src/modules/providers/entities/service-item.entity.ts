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
import { Provider } from './provider.entity';
import { ServiceUnit, ServiceCategory } from '@laundry/shared';

@Entity('service_items')
@Index(['providerId'])
export class ServiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'provider_id' })
  providerId: string;

  @ManyToOne(() => Provider, provider => provider.serviceItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ServiceUnit })
  unit: ServiceUnit;

  @Column({ type: 'int', name: 'price_cents' })
  priceCents: number;

  @Column({ type: 'int', name: 'turnaround_hours', default: 24 })
  turnaroundHours: number;

  @Column({ type: 'enum', enum: ServiceCategory })
  category: ServiceCategory;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
