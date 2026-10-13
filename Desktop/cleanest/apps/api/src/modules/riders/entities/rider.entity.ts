import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { VerificationStatus, VehicleType } from '@laundry/shared';

@Entity('riders')
@Index(['userId'], { unique: true })
export class Rider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true })
  userId: string;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: VehicleType })
  vehicleType: VehicleType;

  @Column({ name: 'vehicle_registration' })
  vehicleRegistration: string;

  @Column({ type: 'jsonb', name: 'documents' })
  documents: {
    nationalId: { url: string; expiresAt: Date; verified: boolean };
    drivingLicense: { url: string; expiresAt: Date; verified: boolean };
    vehicleRegistration: { url: string; expiresAt: Date; verified: boolean };
    backgroundCheck: { url: string; expiresAt: Date; verified: boolean };
  };

  @Column({ default: false, name: 'is_available' })
  isAvailable: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true, name: 'current_latitude' })
  currentLatitude?: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true, name: 'current_longitude' })
  currentLongitude?: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, default: 0.7, name: 'score' })
  score: number;

  @Column({ name: 'payout_number' })
  payoutNumber: string;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
    name: 'verification_status',
  })
  verificationStatus: VerificationStatus;

  @Column({ type: 'int', default: 0, name: 'completed_jobs' })
  completedJobs: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, default: 0, name: 'on_time_rate' })
  onTimeRate: number;

  @Column({ type: 'decimal', precision: 5, scale: 4, default: 0, name: 'acceptance_rate' })
  acceptanceRate: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
