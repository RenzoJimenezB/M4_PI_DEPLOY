import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [],
  controllers: [],
})
export class OrdersModule {}
