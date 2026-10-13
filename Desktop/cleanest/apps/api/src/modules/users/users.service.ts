import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { VerificationStatus } from '@laundry/shared';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { phone } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateVerificationStatus(id: string, status: VerificationStatus): Promise<User> {
    return this.update(id, { verificationStatus: status });
  }

  async updateOtp(id: string, otpCode: string, expiresAt: Date): Promise<User> {
    return this.update(id, { otpCode, otpExpiresAt: expiresAt });
  }

  async updateLastLogin(id: string): Promise<User> {
    return this.update(id, { lastLoginAt: new Date() });
  }

  // Address methods
  async createAddress(addressData: Partial<Address>): Promise<Address> {
    const address = this.addressRepository.create(addressData);
    return this.addressRepository.save(address);
  }

  async findAddressesByUserId(userId: string): Promise<Address[]> {
    return this.addressRepository.find({ where: { userId } });
  }

  async findAddressById(id: string): Promise<Address | null> {
    return this.addressRepository.findOne({ where: { id } });
  }

  async updateAddress(id: string, addressData: Partial<Address>): Promise<Address> {
    await this.addressRepository.update(id, addressData);
    const address = await this.findAddressById(id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async deleteAddress(id: string): Promise<void> {
    await this.addressRepository.delete(id);
  }

  async setDefaultAddress(userId: string, addressId: string): Promise<void> {
    await this.addressRepository.update({ userId }, { isDefault: false });
    await this.addressRepository.update({ id: addressId }, { isDefault: true });
  }
}
