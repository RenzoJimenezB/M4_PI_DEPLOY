import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductIdDto } from 'src/modules/products/dto/product-id.dto';
import { Product } from 'src/modules/products/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  // @ValidateNested({ each: true }) // Ensures that each object in the array is validated according to the rules specified in the referenced DTO. Use when nesting DTOs
  // @Type(() => ProductIdDto) // Transforms plain objects into instances of a DTO class because class-validator relies on the objects being actual instances of the class to perform validation
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Product>[];
  // products: ProductIdDto[];
}
