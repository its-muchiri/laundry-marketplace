import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from './entities/rider.entity';
import { VerificationStatus } from '@laundry/shared';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
  ) {}

  async findById(id: string): Promise<Rider | null> {
    return this.riderRepository.findOne({ where: { id } });
  }

  async findByUserId(userId: string): Promise<Rider | null> {
    return this.riderRepository.findOne({ where: { userId } });
  }

  async findAvailableNearby(
    latitude: number,
    longitude: number,
    radiusMeters: number,
  ): Promise<Rider[]> {
    // Simple bounding box query - in production use PostGIS ST_DWithin
    const latDelta = radiusMeters / 111000;
    const lngDelta = radiusMeters / (111000 * Math.cos((latitude * Math.PI) / 180));

    return this.riderRepository
      .createQueryBuilder('rider')
      .where('rider.isAvailable = :available', { available: true })
      .andWhere('rider.verificationStatus = :status', { status: VerificationStatus.APPROVED })
      .andWhere('rider.currentLatitude BETWEEN :latMin AND :latMax', {
        latMin: latitude - latDelta,
        latMax: latitude + latDelta,
      })
      .andWhere('rider.currentLongitude BETWEEN :lngMin AND :lngMax', {
        lngMin: longitude - lngDelta,
        lngMax: longitude + lngDelta,
      })
      .orderBy('rider.score', 'DESC')
      .getMany();
  }

  async create(riderData: Partial<Rider>): Promise<Rider> {
    const rider = this.riderRepository.create(riderData);
    return this.riderRepository.save(rider);
  }

  async update(id: string, riderData: Partial<Rider>): Promise<Rider> {
    await this.riderRepository.update(id, riderData);
    const rider = await this.findById(id);
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    return rider;
  }

  async updateVerificationStatus(id: string, status: VerificationStatus): Promise<Rider> {
    return this.update(id, { verificationStatus: status });
  }

  async updateLocation(id: string, latitude: number, longitude: number): Promise<Rider> {
    return this.update(id, { currentLatitude: latitude, currentLongitude: longitude });
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<Rider> {
    return this.update(id, { isAvailable });
  }

  async updateScore(id: string, score: number): Promise<Rider> {
    return this.update(id, { score });
  }

  async incrementCompletedJobs(id: string): Promise<Rider> {
    const rider = await this.findById(id);
    if (!rider) {
      throw new NotFoundException('Rider not found');
    }
    return this.update(id, { completedJobs: rider.completedJobs + 1 });
  }
}
