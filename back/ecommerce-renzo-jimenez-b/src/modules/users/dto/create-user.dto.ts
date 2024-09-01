import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  // @MaxLength(50)
  @Length(3, 80)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  // @MaxLength(50)
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
      // minSymbols: 0,
      minSymbols: 1,
    },
    {
      message: 'Password is too weak',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsInt()
  phone: number;

  @IsString()
  @Length(5, 20)
  country: string;

  @IsString()
  @Length(3, 80)
  address: string;

  @IsString()
  @Length(5, 20)
  city: string;
}
