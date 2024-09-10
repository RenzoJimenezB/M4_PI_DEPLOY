import { Expose } from 'class-transformer';
import { PublicUserDto } from './public-user.dto';

export class AdminUserDto extends PublicUserDto {
  @Expose()
  isAdmin: boolean;
}
