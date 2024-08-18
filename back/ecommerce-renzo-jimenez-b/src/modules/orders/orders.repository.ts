import { Injectable } from '@nestjs/common';
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

  async findById(id: string): Promise<Order> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async create(order: CreateOrderDto) {
    const user = await this.usersRepository.findOneById(order.userId);
    const newOrder = this.repository.create({ user });
    let totalPrice = 0;
    let productsToBeOrdered = [];

    const { products } = order;

    for (const product of products) {
      const orderProduct = await this.productsRepository.findOneById(
        product.id,
      );
      if (orderProduct) {
        // update total price (orderDetail)
        totalPrice += orderProduct.price;
        // update stock (product)
        const updatedStock = orderProduct.stock - 1;
        const updatedProduct = await this.productsRepository.updateProduct(
          orderProduct.id,
          { stock: Math.max(updatedStock, 0) },
        );
        // do not return products with a stock === 0 (productsModule)

        // CREATE and REGISTER an orderDetail with the selected products
        productsToBeOrdered.push(orderProduct);
        const orderDetail = await this.orderDetailsRepository.create({
          products: productsToBeOrdered,
          price: totalPrice,
          order: newOrder,
        });

        return newOrder;
        // RETURN order with total price and orderDetail_id
      }
    }
  }
}
