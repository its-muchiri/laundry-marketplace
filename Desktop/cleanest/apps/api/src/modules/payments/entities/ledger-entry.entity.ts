import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('ledger_entries')
@Index(['orderId'])
@Index(['paymentId'])
@Index(['idempotencyKey'], { unique: true })
@Index(['account'])
export class LedgerEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'order_id' })
  orderId: string;

  @Column({ nullable: true, name: 'payment_id' })
  paymentId?: string;

  @Column()
  account: string; // 'customer', 'provider', 'rider', 'platform', 'escrow'

  @Column({ type: 'int', default: 0, name: 'debit_cents' })
  debitCents: number;

  @Column({ type: 'int', default: 0, name: 'credit_cents' })
  creditCents: number;

  @Column()
  reference: string;

  @Column({ unique: true, name: 'idempotency_key' })
  idempotencyKey: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
