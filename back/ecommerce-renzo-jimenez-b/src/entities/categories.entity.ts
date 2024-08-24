import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// import { v4 as uuid } from 'uuid';
import { Product } from './products.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
