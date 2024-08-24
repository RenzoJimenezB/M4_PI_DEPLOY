import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './categories.entity';
import { OrderDetail } from './orderDetails.entity';
// import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'text',
    default:
      'https://media.istockphoto.com/id/1206806317/es/vector/icono-del-carrito-de-compras-aislado-sobre-fondo-blanco.jpg?s=1024x1024&w=is&k=20&c=FgR6yNS6MnF-nGpJTWc_k6ZUyIrJvl1jlW12dicErms=',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail;
}
