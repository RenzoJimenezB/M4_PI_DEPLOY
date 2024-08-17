import { Product } from 'src/entities/products.entity';

export class PaginatedProductsDto {
  data: Product[];
  count: number;
  currentPage: number;
  totalPages: number;
}
