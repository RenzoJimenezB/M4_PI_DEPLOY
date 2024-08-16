import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './products.entity';
import { Order } from './orders.entity';

@Entity({
  name: 'orderdetails',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'orderdetails_products',
  })
  products: Product[];

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;
}
