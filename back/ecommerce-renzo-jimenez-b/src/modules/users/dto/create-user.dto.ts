import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';
import { Match } from '../../../helpers/match.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'name must be at least 3 characters long',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiProperty({
    description: 'email must be a valid email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character',
  })
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
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/, {
  //   message:
  //     'Password must contain at least one uppercase letter, one lowercase letter, one digit and one special character',
  // })
  password: string;

  @ApiProperty({
    description: 'should match password',
  })
  @IsNotEmpty()
  @IsString()
  @Match('password', {
    message: 'Passwords do not match',
  })
  passwordConfirmation: string;

  /**
   * Provided as integer
   * @example 987654321
   */
  @IsNotEmpty()
  @IsInt()
  phone: number;

  @ApiProperty({
    description: 'country must be at least 5 characters long',
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  country: string;

  @ApiProperty({
    description: 'city must be at least 5 characters long',
  })
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  @ApiProperty({
    description: 'This field should be empty: value is assigned by default',
    default: false,
  })
  @IsEmpty()
  // @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({
    description: 'address must be at least 3 characters long',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;
}
