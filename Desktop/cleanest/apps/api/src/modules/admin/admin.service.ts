import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entities/settings.entity';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  // Settings
  async getSetting(key: string): Promise<Settings | null> {
    return this.settingsRepository.findOne({ where: { key } });
  }

  async getAllSettings(): Promise<Settings[]> {
    return this.settingsRepository.find();
  }

  async setSetting(key: string, value: string, description?: string): Promise<Settings> {
    let setting = await this.getSetting(key);
    if (setting) {
      setting.value = value;
      if (description) setting.description = description;
    } else {
      setting = this.settingsRepository.create({ key, value, description });
    }
    return this.settingsRepository.save(setting);
  }

  async deleteSetting(key: string): Promise<void> {
    await this.settingsRepository.delete(key);
  }

  // Audit logs
  async logAction(data: {
    actorId: string;
    action: string;
    entityType: string;
    entityId: string;
    oldValues?: Record<string, any>;
    newValues?: Record<string, any>;
    metadata?: Record<string, any>;
  }): Promise<AuditLog> {
    const log = this.auditLogRepository.create(data);
    return this.auditLogRepository.save(log);
  }

  async getAuditLogs(filters?: {
    actorId?: string;
    action?: string;
    entityType?: string;
    entityId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }): Promise<AuditLog[]> {
    const query = this.auditLogRepository
      .createQueryBuilder('log')
      .orderBy('log.createdAt', 'DESC');

    if (filters?.actorId) query.andWhere('log.actorId = :actorId', { actorId: filters.actorId });
    if (filters?.action) query.andWhere('log.action = :action', { action: filters.action });
    if (filters?.entityType)
      query.andWhere('log.entityType = :entityType', { entityType: filters.entityType });
    if (filters?.entityId)
      query.andWhere('log.entityId = :entityId', { entityId: filters.entityId });
    if (filters?.startDate)
      query.andWhere('log.createdAt >= :startDate', { startDate: filters.startDate });
    if (filters?.endDate) query.andWhere('log.createdAt <= :endDate', { endDate: filters.endDate });

    query.limit(filters?.limit || 100);
    query.offset(filters?.offset || 0);

    return query.getMany();
  }

  // Dashboard stats
  async getDashboardStats(): Promise<any> {
    // TODO: Implement actual stats queries
    return {
      totalOrders: 0,
      pendingOrders: 0,
      completedOrders: 0,
      disputedOrders: 0,
      totalRevenue: 0,
      pendingPayouts: 0,
      activeProviders: 0,
      activeRiders: 0,
      activeCustomers: 0,
    };
  }
}
