import {
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsObject,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { OrderState } from '@laundry/shared';

export class OrderItemDto {
  @ApiProperty()
  @IsString()
  serviceItemId: string;

  @ApiProperty({ default: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  weightKg?: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  providerId: string;

  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty()
  @IsObject()
  pickupCoordinates: { latitude: number; longitude: number };

  @ApiProperty()
  @IsString()
  pickupLandmark: string;

  @ApiProperty()
  @IsObject()
  deliveryCoordinates: { latitude: number; longitude: number };

  @ApiProperty()
  @IsString()
  deliveryLandmark: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPeak?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  scheduledPickupAt?: Date;
}

export class TransitionStateDto {
  @ApiProperty({ enum: OrderState })
  newState: OrderState;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}

export class ApprovePriceDto {
  @ApiProperty()
  @IsBoolean()
  approved: boolean;
}
