import { Type } from 'class-transformer';
import { ArrayMinSize, IsUUID, ValidateNested } from 'class-validator';
import { ProductIdDto } from 'src/modules/products/dto/product-id.dto';

export class CreateOrderDto {
  @IsUUID()
  userId: string;

  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  @ArrayMinSize(1)
  products: ProductIdDto[];
}
