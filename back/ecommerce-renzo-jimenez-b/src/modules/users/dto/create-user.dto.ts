import {
  IsBoolean,
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

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

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

  @IsNotEmpty()
  @IsString()
  @Match('password', {
    message: 'Passwords do not match',
  })
  passwordConfirmation: string;

  @IsNotEmpty()
  @IsInt()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  city: string;

  @IsEmpty()
  // @IsBoolean()
  isAdmin: boolean;

  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  address: string;
}
