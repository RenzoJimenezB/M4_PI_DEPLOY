import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { PublicOrderDto } from 'src/modules/orders/dto/public-order.dto';

export class PublicUserDto {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  passwordConfirmation: string;

  phone: number;
  country: string;
  city: string;
  address: string;

  @Expose({ groups: ['admin'] })
  isAdmin: boolean;

  @Transform(({ value }) => plainToInstance(PublicOrderDto, value))
  orders: PublicOrderDto[];
}
