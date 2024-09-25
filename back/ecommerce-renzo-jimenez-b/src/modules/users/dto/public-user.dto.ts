import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { PublicOrderDto } from '../../orders/dto/public-order.dto';

export class PublicUserDto {
  /**
   * UUID
   * @example cc8c868c-9594-41e4-8427-e9e80f3ca921
   */
  id: string;

  /**
   * @example 'Renzo'
   */
  name: string;

  /**
   * @example 'renzo@mail.com
   */
  email: string;

  /**
   * This property is excluded from the returned user object(s)
   */
  @Exclude()
  password: string;

  // @Exclude()
  // passwordConfirmation: string;

  /**
   * @example 999999999
   */
  phone: number;

  /**
   * @example 'Spain'
   */
  country: string;

  /**
   * @example 'Barcelona'
   */
  city: string;

  /**
   * @example 'Av Guardia Civil 475'
   */
  address: string;

  /**
   * This property is exposed only when group specified is passed when transforming the returned user object(s)
   */
  @Expose({ groups: ['admin'] })
  isAdmin: boolean;

  /**
   * Associated order objects are formatted to show id and formatted date
   */
  @Transform(({ value }) => plainToInstance(PublicOrderDto, value))
  orders: PublicOrderDto[];
}
