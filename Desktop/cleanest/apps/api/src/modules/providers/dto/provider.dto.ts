import {
  IsNumber,
  IsInt,
  Min,
  Max,
  IsObject,
  ValidateNested,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ServiceUnit, ServiceCategory } from '@laundry/shared';

export class CreateProviderDto {
  @ApiProperty({ example: -0.5 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  facilityLatitude: number;

  @ApiProperty({ example: 37.3 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  facilityLongitude: number;

  @ApiPropertyOptional({ default: 5000 })
  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(50000)
  radiusMeters?: number;

  @ApiPropertyOptional({ default: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  dailyCapacityKg?: number;

  @ApiProperty({ example: { monday: { open: '08:00', close: '18:00', closed: false } } })
  @IsObject()
  openingHours: Record<string, { open: string; close: string; closed: boolean }>;

  @ApiPropertyOptional({ default: 24 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(168)
  turnaroundHours?: number;

  @ApiProperty({ example: '+254700123456' })
  @IsString()
  mpesaNumber: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  bankAccount?: { bankName: string; accountNumber: string; accountName: string };
}

export class UpdateProviderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(100)
  @Max(50000)
  radiusMeters?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  dailyCapacityKg?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  openingHours?: Record<string, { open: string; close: string; closed: boolean }>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(168)
  turnaroundHours?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mpesaNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  bankAccount?: { bankName: string; accountNumber: string; accountName: string };

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payoutDetails?: { mpesaNumber: string; bankAccount?: any; verified: boolean };

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoAccept?: boolean;
}

export class CreateServiceItemDto {
  @ApiProperty({ example: 'Wash and Fold' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ enum: ServiceUnit })
  @IsEnum(ServiceUnit)
  unit: ServiceUnit;

  @ApiProperty({ example: 15000 })
  @IsInt()
  @Min(1)
  priceCents: number;

  @ApiPropertyOptional({ default: 24 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(168)
  turnaroundHours?: number;

  @ApiProperty({ enum: ServiceCategory })
  @IsEnum(ServiceCategory)
  category: ServiceCategory;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class UpdateServiceItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  priceCents?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(168)
  turnaroundHours?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
