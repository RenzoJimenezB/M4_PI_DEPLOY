import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/orderDetails.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class OrderDetailsRepository {
  constructor(
    @InjectRepository(OrderDetail)
    private repository: Repository<OrderDetail>,
  ) {}

  async save(orderDetail: Partial<OrderDetail>, manager?: EntityManager) {
    const repository = manager
      ? manager.getRepository(OrderDetail)
      : this.repository;

    await repository.save(orderDetail);
  }
}
