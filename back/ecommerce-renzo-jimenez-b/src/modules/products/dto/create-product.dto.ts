import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @Transform(({ value }) => value || 'default-image-url.jpg')
  imgUrl?: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
