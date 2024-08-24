import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { User } from './users.entity';
import { OrderDetail } from './orderDetails.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @BeforeInsert()
  assignDefaultDate() {
    this.date = new Date();
  }

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail;
}
