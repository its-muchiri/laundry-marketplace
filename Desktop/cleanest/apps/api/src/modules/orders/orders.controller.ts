import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, TransitionStateDto, ApprovePriceDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole, OrderState } from '@laundry/shared';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  async createOrder(@CurrentUser() user: any, @Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.createOrder(createOrderDto, user.userId);
    return { order };
  }

  @Get()
  @ApiOperation({ summary: 'Get current user orders' })
  async getMyOrders(@CurrentUser() user: any) {
    const orders = await this.ordersService.findByCustomerId(user.userId);
    return { orders };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  async getOrder(@Param('id') id: string, @CurrentUser() user: any) {
    const order = await this.ordersService.findById(id);
    if (!order) {
      return { error: 'Order not found' };
    }
    // Check authorization
    if (user.role === UserRole.CUSTOMER && order.customerId !== user.userId) {
      return { error: 'Forbidden' };
    }
    if (user.role === UserRole.PROVIDER && order.providerId !== user.userId) {
      return { error: 'Forbidden' };
    }
    return { order };
  }

  @Patch(':id/transition')
  @ApiOperation({ summary: 'Transition order state' })
  async transitionState(
    @Param('id') id: string,
    @Body() transitionStateDto: TransitionStateDto,
    @CurrentUser() user: any,
  ) {
    const order = await this.ordersService.transitionState(
      id,
      transitionStateDto.newState,
      user.userId,
      user.role,
      transitionStateDto.metadata,
    );
    return { order };
  }

  @Patch(':id/approve-price')
  @ApiOperation({ summary: 'Approve price change (customer)' })
  async approvePrice(@Param('id') id: string, @CurrentUser() user: any) {
    const order = await this.ordersService.approvePriceChange(id, user.userId);
    return { order };
  }

  @Patch(':id/final-price')
  @ApiOperation({ summary: 'Update final price after weighing (provider)' })
  async updateFinalPrice(
    @Param('id') id: string,
    @Body() body: { finalWeightKg: number },
    @CurrentUser() user: any,
  ) {
    const order = await this.ordersService.updateFinalPrice(id, body.finalWeightKg, user.userId);
    return { order };
  }

  // Provider dashboard
  @Get('provider/me')
  @ApiOperation({ summary: 'Get provider orders' })
  async getProviderOrders(@CurrentUser() user: any) {
    if (user.role !== UserRole.PROVIDER) {
      return { error: 'Forbidden' };
    }
    const provider = await this.ordersService['providerRepository'].findOne({
      where: { userId: user.userId },
    });
    if (!provider) {
      return { error: 'Provider profile not found' };
    }
    const orders = await this.ordersService.findByProviderId(provider.id);
    return { orders };
  }
}
