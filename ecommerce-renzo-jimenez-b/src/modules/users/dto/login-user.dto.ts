import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  /**
   * @example 'renzo@mail.com'
   */
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  /**
   * @example 'Renzo123!
   */
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

// export class LoginUserDto extends PickType(CreateUserDto, [
//   'password',
//   'email',
// ]) {}
