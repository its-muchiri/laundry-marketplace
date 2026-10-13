import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ServiceItem } from './service-item.entity';
import { VerificationStatus } from '@laundry/shared';

@Entity('providers')
@Index(['userId'], { unique: true })
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 8, name: 'facility_latitude' })
  facilityLatitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, name: 'facility_longitude' })
  facilityLongitude: number;

  @Column({ type: 'int', name: 'radius_meters', default: 5000 })
  radiusMeters: number;

  @Column({ type: 'int', name: 'daily_capacity_kg', default: 50 })
  dailyCapacityKg: number;

  @Column({ type: 'jsonb', name: 'opening_hours' })
  openingHours: Record<string, { open: string; close: string; closed: boolean }>;

  @Column({ type: 'int', name: 'turnaround_hours', default: 24 })
  turnaroundHours: number;

  @Column({ type: 'enum', enum: ['bronze', 'silver', 'gold'], default: 'bronze' })
  tier: 'bronze' | 'silver' | 'gold';

  @Column({ type: 'decimal', precision: 5, scale: 4, name: 'commission_rate', default: 0.15 })
  commissionRate: number;

  @Column({ type: 'jsonb', name: 'payout_details' })
  payoutDetails: {
    mpesaNumber: string;
    bankAccount?: { bankName: string; accountNumber: string; accountName: string };
    verified: boolean;
  };

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
    name: 'verification_status',
  })
  verificationStatus: VerificationStatus;

  @Column({ type: 'jsonb', nullable: true, name: 'documents' })
  documents?: Record<string, { url: string; expiresAt: Date; verified: boolean }>;

  @Column({ default: true, name: 'auto_accept' })
  autoAccept: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ServiceItem, item => item.provider)
  serviceItems: ServiceItem[];
}
