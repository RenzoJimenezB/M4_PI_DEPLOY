import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/orderDetails.entity';
import { OrderDetailsService } from './orderDetails.service';
import { OrderDetailsRepository } from './orderDetails.repository';
import { OrderDetailsController } from './orderDetails.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  providers: [OrderDetailsService, OrderDetailsRepository],
  controllers: [OrderDetailsController],
  exports: [OrderDetailsRepository],
})
export class OrderDetailModule {}
