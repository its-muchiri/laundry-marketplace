import {
  IsEnum,
  IsString,
  IsObject,
  ValidateNested,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { VehicleType } from '@laundry/shared';

export class CreateRiderDto {
  @ApiProperty({ enum: VehicleType })
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @ApiProperty({ example: 'KBZ 123A' })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  vehicleRegistration: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Object)
  documents: {
    nationalId: { url: string; expiresAt: Date; verified: boolean };
    drivingLicense: { url: string; expiresAt: Date; verified: boolean };
    vehicleRegistration: { url: string; expiresAt: Date; verified: boolean };
    backgroundCheck: { url: string; expiresAt: Date; verified: boolean };
  };

  @ApiProperty({ example: '+254700123456' })
  @IsString()
  payoutNumber: string;
}

export class UpdateRiderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(VehicleType)
  vehicleType?: VehicleType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  vehicleRegistration?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  documents?: {
    nationalId: { url: string; expiresAt: Date; verified: boolean };
    drivingLicense: { url: string; expiresAt: Date; verified: boolean };
    vehicleRegistration: { url: string; expiresAt: Date; verified: boolean };
    backgroundCheck: { url: string; expiresAt: Date; verified: boolean };
  };

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  payoutNumber?: string;
}

export class UpdateLocationDto {
  @ApiProperty({ example: -0.5 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({ example: 37.3 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;
}
