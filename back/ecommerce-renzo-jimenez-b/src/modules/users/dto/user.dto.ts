import { Exclude } from 'class-transformer';

export class UserDto {
  id: number;
  name: string;
  email: string;

  @Exclude()
  password: string;

  address: string;
  phone: string;
}
