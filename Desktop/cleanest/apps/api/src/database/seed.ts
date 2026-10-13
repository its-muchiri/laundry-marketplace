import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import dataSource from './data-source';
import { User } from '../modules/users/entities/user.entity';
import { Address } from '../modules/users/entities/address.entity';
import { Provider } from '../modules/providers/entities/provider.entity';
import { ServiceItem } from '../modules/providers/entities/service-item.entity';
import { Rider } from '../modules/riders/entities/rider.entity';
import {
  UserRole,
  VerificationStatus,
  ServiceUnit,
  ServiceCategory,
  VehicleType,
} from '@laundry/shared';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    await dataSource.initialize();
    console.log('✅ Database connected');

    const userRepo = dataSource.getRepository(User);
    const addressRepo = dataSource.getRepository(Address);
    const providerRepo = dataSource.getRepository(Provider);
    const serviceItemRepo = dataSource.getRepository(ServiceItem);
    const riderRepo = dataSource.getRepository(Rider);

    // Check if already seeded
    const existingUser = await userRepo.findOne({ where: { phone: '+254700000001' } });
    if (existingUser) {
      console.log('ℹ️  Database already seeded');
      return;
    }

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = userRepo.create({
      phone: '+254700000001',
      email: 'admin@laundry.ke',
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      verificationStatus: VerificationStatus.APPROVED,
    });
    await userRepo.save(admin);
    console.log('✅ Created admin user');

    // Create test customer
    const customerPassword = await bcrypt.hash('customer123', 10);
    const customer = userRepo.create({
      phone: '+254700000002',
      email: 'customer@example.com',
      passwordHash: customerPassword,
      role: UserRole.CUSTOMER,
      verificationStatus: VerificationStatus.APPROVED,
    });
    await userRepo.save(customer);
    console.log('✅ Created test customer');

    // Create customer address (Kutus area)
    const address = addressRepo.create({
      userId: customer.id,
      label: 'Home',
      latitude: -0.5,
      longitude: 37.283333,
      landmarkNote: 'Blue gate, near Kutus market',
      isDefault: true,
    });
    await addressRepo.save(address);
    console.log('✅ Created customer address');

    // Create test provider
    const providerUser = userRepo.create({
      phone: '+254700000003',
      email: 'provider@example.com',
      passwordHash: await bcrypt.hash('provider123', 10),
      role: UserRole.PROVIDER,
      verificationStatus: VerificationStatus.APPROVED,
    });
    await userRepo.save(providerUser);

    const provider = providerRepo.create({
      userId: providerUser.id,
      facilityLatitude: -0.505,
      facilityLongitude: 37.285,
      radiusMeters: 10000,
      dailyCapacityKg: 100,
      openingHours: {
        monday: { open: '08:00', close: '18:00', closed: false },
        tuesday: { open: '08:00', close: '18:00', closed: false },
        wednesday: { open: '08:00', close: '18:00', closed: false },
        thursday: { open: '08:00', close: '18:00', closed: false },
        friday: { open: '08:00', close: '18:00', closed: false },
        saturday: { open: '08:00', close: '16:00', closed: false },
        sunday: { open: '09:00', close: '14:00', closed: true },
      },
      turnaroundHours: 24,
      tier: 'bronze',
      commissionRate: 0.15,
      payoutDetails: {
        mpesaNumber: '+254700000003',
        verified: true,
      },
      verificationStatus: VerificationStatus.APPROVED,
      autoAccept: true,
    });
    await providerRepo.save(provider);
    console.log('✅ Created test provider');

    // Create service items for provider
    const services = [
      {
        name: 'Wash & Fold',
        unit: ServiceUnit.KG,
        priceCents: 15000,
        turnaroundHours: 24,
        category: ServiceCategory.WASH_FOLD,
        tags: ['eco-friendly'],
      },
      {
        name: 'Dry Cleaning - Suit',
        unit: ServiceUnit.PIECE,
        priceCents: 80000,
        turnaroundHours: 48,
        category: ServiceCategory.DRY_CLEANING,
        tags: ['stain-specialist'],
      },
      {
        name: 'Dry Cleaning - Dress',
        unit: ServiceUnit.PIECE,
        priceCents: 60000,
        turnaroundHours: 48,
        category: ServiceCategory.DRY_CLEANING,
        tags: [],
      },
      {
        name: 'Ironing Only',
        unit: ServiceUnit.PIECE,
        priceCents: 10000,
        turnaroundHours: 12,
        category: ServiceCategory.IRONING,
        tags: ['same-day'],
      },
      {
        name: 'Bedding Set',
        unit: ServiceUnit.PIECE,
        priceCents: 50000,
        turnaroundHours: 24,
        category: ServiceCategory.SPECIALTY,
        tags: [],
      },
    ];

    for (const svc of services) {
      const item = serviceItemRepo.create({ ...svc, providerId: provider.id, isActive: true });
      await serviceItemRepo.save(item);
    }
    console.log('✅ Created service items');

    // Create test rider
    const riderUser = userRepo.create({
      phone: '+254700000004',
      email: 'rider@example.com',
      passwordHash: await bcrypt.hash('rider123', 10),
      role: UserRole.RIDER,
      verificationStatus: VerificationStatus.APPROVED,
    });
    await userRepo.save(riderUser);

    const rider = riderRepo.create({
      userId: riderUser.id,
      vehicleType: VehicleType.BIKE,
      vehicleRegistration: 'KBZ 123A',
      documents: {
        nationalId: {
          url: 'https://example.com/national-id.pdf',
          expiresAt: new Date('2027-01-01'),
          verified: true,
        },
        drivingLicense: {
          url: 'https://example.com/license.pdf',
          expiresAt: new Date('2027-01-01'),
          verified: true,
        },
        vehicleRegistration: {
          url: 'https://example.com/reg.pdf',
          expiresAt: new Date('2027-01-01'),
          verified: true,
        },
        backgroundCheck: {
          url: 'https://example.com/bg.pdf',
          expiresAt: new Date('2027-01-01'),
          verified: true,
        },
      },
      isAvailable: true,
      currentLatitude: -0.502,
      currentLongitude: 37.284,
      score: 0.85,
      payoutNumber: '+254700000004',
      verificationStatus: VerificationStatus.APPROVED,
    });
    await riderRepo.save(rider);
    console.log('✅ Created test rider');

    console.log('🎉 Seeding completed successfully!');
    console.log('');
    console.log('Test accounts:');
    console.log('  Admin:    +254700000001 / admin123');
    console.log('  Customer: +254700000002 / customer123');
    console.log('  Provider: +254700000003 / provider123');
    console.log('  Rider:    +254700000004 / rider123');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

seed();
