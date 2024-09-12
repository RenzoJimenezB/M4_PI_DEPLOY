import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsString()
  // @Transform(({ value }) => value || 'https://images.com/default-image.jpg')
  imgUrl?: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  category: string;
}
