import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/orders.entity';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { OrdersController } from './orders.controller';
import { ProductsModule } from '../products/products.module';
import { OrderDetailModule } from '../orderDetails/orderDetails.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UsersModule,
    ProductsModule,
    OrderDetailModule,
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController],
})
export class OrdersModule {}
