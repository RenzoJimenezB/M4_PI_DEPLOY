import { Order } from 'src/entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  getOrder(id: string): Promise<Order> {
    return this.ordersRepository.findById(id);
  }

  async addOrder(order: CreateOrderDto) {
    const orderDto = plainToInstance(CreateOrderDto, order);

    try {
      await validateData(orderDto);
      return this.ordersRepository.create(orderDto);
    } catch (error) {
      throw error;
    }
  }
}
