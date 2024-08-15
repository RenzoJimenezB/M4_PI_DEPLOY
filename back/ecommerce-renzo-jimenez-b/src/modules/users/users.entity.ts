import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from '../orders/orders.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  name: string;

  @Column()
  email: string;
  // unique
  // custom decorator?

  @Column()
  password: string;
  // @IsNotEmpty()
  // @Matches(/REGEX/, {
  //   message: 'Password must contain at least 6 characters, 1 uppercase letter and 1 digit',
  // })
  // @IsStrongPassword({
  //   minLength: 8,
  //   minNumbers: 1,
  //   minUppercase: 1,
  // })
  // @MaxLength(20)

  @Column()
  phone: number;
  // @IsNumber({
  //   maxDecimalPlaces: 0,
  // })

  @Column()
  country: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @OneToMany(() => Order, (order) => order.user_id)
  orders_id: Order[];
}
