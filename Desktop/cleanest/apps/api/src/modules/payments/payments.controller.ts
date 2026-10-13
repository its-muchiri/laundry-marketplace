import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { InitiatePaymentDto, MpesaCallbackDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '@laundry/shared';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate M-Pesa STK Push payment' })
  async initiatePayment(@CurrentUser() user: any, @Body() initiatePaymentDto: InitiatePaymentDto) {
    const result = await this.paymentsService.initiatePayment(
      initiatePaymentDto.orderId,
      user.userId,
    );
    return result;
  }

  @Post('mpesa/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'M-Pesa STK Push callback' })
  async mpesaCallback(@Body() callbackData: MpesaCallbackDto) {
    const payment = await this.paymentsService.handleMpesaCallback(callbackData);
    return { success: true, payment };
  }

  @Post('mpesa/timeout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'M-Pesa STK Push timeout callback' })
  async mpesaTimeout(@Body() callbackData: any) {
    // Handle timeout - similar to failed callback
    return { success: true };
  }

  @Get(':orderId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get payment status for order' })
  async getPaymentStatus(@Param('orderId') orderId: string, @CurrentUser() user: any) {
    // TODO: Implement payment status query
    return { status: 'pending' };
  }

  // Admin: manually release payouts
  @Post('admin/:orderId/release-payouts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Release payouts for completed order (admin)' })
  async releasePayouts(@Param('orderId') orderId: string, @CurrentUser() user: any) {
    if (user.role !== UserRole.ADMIN) {
      return { error: 'Forbidden' };
    }
    await this.paymentsService.releasePayouts(orderId);
    return { success: true };
  }
}
