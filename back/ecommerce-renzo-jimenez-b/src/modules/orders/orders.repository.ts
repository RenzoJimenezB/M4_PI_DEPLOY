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
    const user = await this.usersRepository.findOneById(order.userId);
    const newOrder = this.repository.create({ user });
    // add date to order instance (nest lifecycle hook)
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
        await this.productsRepository.updateProduct(orderProduct.id, {
          stock: Math.max(updatedStock, 0),
        });

        productsToBeOrdered.push(orderProduct);

        // PENDING:
        // do not return products with a stock === 0 (productsModule)
      }
    }
    // CREATE and REGISTER an orderDetail with the selected products
    if (productsToBeOrdered.length > 0) {
      const orderDetail = await this.orderDetailsRepository.create({
        products: productsToBeOrdered,
        price: totalPrice,
        order: newOrder,
      });

      // RETURN order with total price and orderDetail_id
      const orderWithDetails: OrderWithDetailsDto = {
        order: newOrder,
        orderDetailId: orderDetail.id,
        totalPrice: orderDetail.price,
      };
      return orderWithDetails;
    } else {
      throw new Error('No products were ordered');
    }
  }
}
