import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrder() {}

  @Post()
  addOrder() {}
}
