import { Exclude, plainToInstance, Transform } from 'class-transformer';
import { PublicOrderDto } from 'src/modules/orders/dto/public-order.dto';

export class PublicUserDto {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  phone: number;
  country: string;
  city: string;
  address: string;

  @Exclude()
  isAdmin: boolean;

  @Transform(({ value }) => plainToInstance(PublicOrderDto, value))
  orders: PublicOrderDto[];
}
