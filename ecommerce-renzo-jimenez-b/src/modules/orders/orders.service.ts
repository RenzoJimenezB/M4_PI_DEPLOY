import { Injectable } from '@nestjs/common';
import { Order } from './entities/orders.entity';
import { plainToInstance } from 'class-transformer';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { validateData } from 'src/helpers/validateData';
import { PublicOrderDto } from './dto/public-order.dto';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async findAll() {
    const orders = await this.ordersRepository.findAll();
    return plainToInstance(PublicOrderDto, orders);
  }

  async getOrder(id: string): Promise<PublicOrderDto> {
    const order = await this.ordersRepository.findById(id);
    return plainToInstance(PublicOrderDto, order);
  }

  async addOrder(order: CreateOrderDto): Promise<PublicOrderDto> {
    const newOrder = await this.ordersRepository.create(order);
    return plainToInstance(PublicOrderDto, newOrder);
  }
}
