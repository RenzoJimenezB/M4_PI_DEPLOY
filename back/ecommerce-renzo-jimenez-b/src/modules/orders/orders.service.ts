import { Injectable } from '@nestjs/common';
import { Order } from './entities/orders.entity';
import { plainToInstance } from 'class-transformer';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { validateData } from 'src/helpers/validateData';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  findAll() {
    return this.ordersRepository.findAll();
  }

  getOrder(id: string): Promise<Order> {
    return this.ordersRepository.findById(id);
  }

  async addOrder(order: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.create(order);

    //   const orderDto = plainToInstance(CreateOrderDto, order);

    //   try {
    //     await validateData(orderDto);
    //     return this.ordersRepository.create(orderDto);
    //   } catch (error) {
    //     throw error;
    //   }
  }
}
