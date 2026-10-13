import { IsOptional, IsInt, Min, Max, IsObject, IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateProviderDto } from './provider.dto';

export class UpdateProviderDto extends PartialType(CreateProviderDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  payoutDetails?: { mpesaNumber: string; bankAccount?: any; verified: boolean };

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoAccept?: boolean;
}
