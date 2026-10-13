import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderLeg } from './entities/order-leg.entity';
import { OrderEvent } from './entities/order-event.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

import { ServiceItem } from '../providers/entities/service-item.entity';
import { Provider } from '../providers/entities/provider.entity';
import { RidersModule } from '../riders/riders.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, OrderLeg, OrderEvent, ServiceItem, Provider]),
    RidersModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
