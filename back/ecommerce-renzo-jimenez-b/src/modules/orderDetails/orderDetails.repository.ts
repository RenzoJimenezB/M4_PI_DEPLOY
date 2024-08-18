import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/orderDetails.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private repository: Repository<OrderDetail>,
  ) {}

  async create(orderDetail: Partial<OrderDetail>) {
    return this.repository.save(orderDetail);

    // id, price, products, orderId
  }
}
