import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/orderDetails.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private repository: Repository<OrderDetail>,
  ) {}

  async save(orderDetail: Partial<OrderDetail>) {
    const savedOrder = await this.repository.save(orderDetail);

    return this.repository.findOne({
      where: { id: savedOrder.id },
      relations: {
        products: true,
      },
    });

    // id, price, products, orderId
  }
}
