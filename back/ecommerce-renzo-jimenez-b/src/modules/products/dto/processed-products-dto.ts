import { Product } from 'src/entities/products.entity';

export class ProcessedProductsDto {
  products: Product[];
  totalPrice: number;
}
