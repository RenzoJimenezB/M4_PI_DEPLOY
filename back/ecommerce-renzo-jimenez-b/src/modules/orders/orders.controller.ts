import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findOne(id: string) {
    return this.ordersService.getOrder(id);
  }

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.ordersService.addOrder(order);
  }
}
