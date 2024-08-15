import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../users/users.entity';
import { OrderDetail } from '../orderDetails/orderDetails.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => User, (user) => user.orders_id)
  user_id: User[];

  @Column({ type: 'date' })
  date: string;

  @OneToOne(() => OrderDetail)
  @JoinColumn()
  orderDetails: OrderDetail;
}
