import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsRepository } from '../products/products.repository';
import { UsersRepository } from '../users/users.repository';
import { OrderDetailsRepository } from '../orderDetails/orderDetails.repository';
import { OrderWithDetailsDto } from './dto/order-with-details.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private repository: Repository<Order>,
    private usersRepository: UsersRepository,
    private productsRepository: ProductsRepository,
    private orderDetailsRepository: OrderDetailsRepository,
  ) {}

  async findById(id: string): Promise<Order> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async create(order: CreateOrderDto): Promise<OrderWithDetailsDto> {
    // find user and assign it to a new order
    const user = await this.usersRepository.findOneById(order.userId);

    // create and save order instance to generate and persist the ID
    const newOrder = await this.repository.save(
      this.repository.create({ user }),
    );

    let totalPrice = 0;
    let productsToBeOrdered = [];

    const { products } = order;

    for (const product of products) {
      const orderProduct = await this.productsRepository.findOneById(
        product.id,
      );

      if (orderProduct) {
        // udpate total price (orderDetail)
        totalPrice += orderProduct.price;

        // update stock (product)
        const updatedStock = orderProduct.stock - 1;
        await this.productsRepository.updateProduct(orderProduct.id, {
          stock: Math.max(updatedStock, 0),
        });

        productsToBeOrdered.push(orderProduct);
      }
    }

    if (productsToBeOrdered.length === 0) {
      throw new Error('No products were ordered');
    }

    // create and save orderDetail instance
    const orderDetail = await this.orderDetailsRepository.create({
      products: productsToBeOrdered,
      price: totalPrice,
      order: newOrder,
    });

    // return order with total price and orderDetail_id
    const orderWithDetails: OrderWithDetailsDto = {
      order: newOrder,
      orderDetailId: orderDetail.id,
      totalPrice: orderDetail.price,
    };

    return orderWithDetails;
  }
}
