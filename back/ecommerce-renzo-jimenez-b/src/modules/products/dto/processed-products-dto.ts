import { Product } from '../entities/products.entity';

export class ProcessedProductsDto {
  products: Product[];
  totalPrice: number;
}
