import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/modules/orders/entities/orders.entity';
import { Product } from 'src/modules/products/entities/products.entity';
// import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orderdetails',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({ name: 'orderdetails_products' })
  products: Product[];
}
