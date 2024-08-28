import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsRepository } from '../products/products.repository';
import { UsersRepository } from '../users/users.repository';
import { OrderDetailsRepository } from '../orderDetails/orderDetails.repository';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
    private usersRepository: UsersRepository,
    private productsRepository: ProductsRepository,
    private orderDetailsRepository: OrderDetailsRepository,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Order> {
    return await this.repository.findOne({
      where: { id },
      relations: { orderDetail: { products: true } },
    });
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOneById(order.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newOrder = await this.repository.create({ user });
    await this.repository.save(newOrder);

    const { products, totalPrice } =
      await this.productsRepository.processProducts(order.products);

    if (products.length === 0) {
      throw new BadRequestException('No valid products were ordered');
    }

    await this.orderDetailsRepository.save({
      products,
      price: totalPrice,
      order: newOrder,
    });

    return this.repository.findOne({
      where: { id: newOrder.id },
      relations: { orderDetail: { products: true } },
    });
  }
}
