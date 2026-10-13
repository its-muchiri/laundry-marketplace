import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { ServiceItem } from './entities/service-item.entity';
import { VerificationStatus } from '@laundry/shared';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    @InjectRepository(ServiceItem)
    private serviceItemRepository: Repository<ServiceItem>,
  ) {}

  async findById(id: string): Promise<Provider | null> {
    return this.providerRepository.findOne({ where: { id }, relations: ['serviceItems'] });
  }

  async findByUserId(userId: string): Promise<Provider | null> {
    return this.providerRepository.findOne({ where: { userId }, relations: ['serviceItems'] });
  }

  async findApproved(): Promise<Provider[]> {
    return this.providerRepository.find({
      where: { verificationStatus: VerificationStatus.APPROVED },
      relations: ['serviceItems'],
    });
  }

  async findPendingApproval(): Promise<Provider[]> {
    return this.providerRepository.find({
      where: { verificationStatus: VerificationStatus.PENDING },
      relations: ['user'],
    });
  }

  async create(providerData: Partial<Provider>): Promise<Provider> {
    const provider = this.providerRepository.create(providerData);
    return this.providerRepository.save(provider);
  }

  async update(id: string, providerData: Partial<Provider>): Promise<Provider> {
    await this.providerRepository.update(id, providerData);
    const provider = await this.findById(id);
    if (!provider) {
      throw new NotFoundException('Provider not found');
    }
    return provider;
  }

  async updateVerificationStatus(id: string, status: VerificationStatus): Promise<Provider> {
    return this.update(id, { verificationStatus: status });
  }

  // Service items
  async createServiceItem(itemData: Partial<ServiceItem>): Promise<ServiceItem> {
    const item = this.serviceItemRepository.create(itemData);
    return this.serviceItemRepository.save(item);
  }

  async findServiceItemsByProviderId(providerId: string): Promise<ServiceItem[]> {
    return this.serviceItemRepository.find({ where: { providerId, isActive: true } });
  }

  async updateServiceItem(id: string, itemData: Partial<ServiceItem>): Promise<ServiceItem> {
    await this.serviceItemRepository.update(id, itemData);
    const item = await this.serviceItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Service item not found');
    }
    return item;
  }

  async deleteServiceItem(id: string): Promise<void> {
    await this.serviceItemRepository.delete(id);
  }
}
