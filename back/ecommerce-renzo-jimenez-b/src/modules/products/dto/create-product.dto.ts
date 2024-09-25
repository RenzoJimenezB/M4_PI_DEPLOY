import { ApiProperty } from '@nestjs/swagger';
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
  /**
   * @example 'Laptop'
   */
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  /**
   * @example 'Brief description'
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * @example 15.50
   */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * Integers only
   * @example 352
   */
  @IsNotEmpty()
  @IsInt()
  stock: number;

  /**
   * @example 'https://images.com/default-image.jpg'
   */
  @IsString()
  // @Transform(({ value }) => value || 'https://images.com/default-image.jpg')
  imgUrl?: string;

  /**
   * @example 'Technology'
   */
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  category: string;
}
