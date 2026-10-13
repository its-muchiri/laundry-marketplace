import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InitiatePaymentDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class MpesaCallbackDto {
  @ApiProperty()
  @IsString()
  CheckoutRequestID: string;

  @ApiProperty()
  @IsString()
  ResultCode: string;

  @ApiProperty()
  @IsString()
  ResultDesc: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Amount?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  MpesaReceiptNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  TransactionDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  PhoneNumber?: string;
}
