import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';
import { Match } from '../../../helpers/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  /**
   * @example 'Renzo'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  /**
   * @example 'renzo@mail.com'
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * At least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character
   * @example 'Renzo123!'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character',
    },
  )
  password: string;

  /**
   * Should match password
   * @example 'Renzo123!'
   */
  @IsNotEmpty()
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  passwordConfirmation: string;

  /**
   * @example 999999999
   */
  @IsNotEmpty()
  @IsInt()
  phone: number;

  /**
   * @example 'Spain'
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  country: string;

  /**
   * @example 'Barcelona'
   */
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  /**
   * This field should be empty
   */
  @ApiProperty({ default: false })
  @IsEmpty()
  isAdmin: boolean;

  /**
   * @example 'Av Guardia Civil 475'
   */
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;
}
