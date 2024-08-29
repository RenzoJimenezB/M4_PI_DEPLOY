import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { validateData } from 'src/helpers/validateData';
import { Product } from './entities/products.entity';
import { PaginatedProductsDto } from './dto/paginated-products.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(
    page: number,
    limit: number,
  ): Promise<PaginatedProductsDto> {
    return this.productsRepository.findAll(page, limit);
    // al realizar la busqueda de todos los productos aquellos con stock === 0
    // no deben ser mostrados
  }

  // return data only:
  // async getProducts(page: number, limit: number): Promise<Product[]> {
  //   const { data } = await this.productsRepository.findAll(page, limit);
  //   return data;
  // }

  async getProductById(id: string): Promise<Product> {
    return this.productsRepository.findOneById(id);
  }

  async addProducts() {
    return this.productsRepository.addProducts();
  }

  async createProduct(product: CreateProductDto) {
    const productDto = plainToInstance(CreateProductDto, product);

    try {
      await validateData(productDto);
      return this.productsRepository.create(productDto);
    } catch (error) {
      throw error;
    }
  }

  // async seedProducts(products: CreateProductDto[]) {
  //   return this.productsRepository.seedProducts(products);
  // }

  async updateProduct(id: string, updateData: Partial<Product>) {
    return this.productsRepository.updateProduct(id, updateData);
  }

  // deleteProduct(id: number) {
  //   return this.productsRepository.deleteProduct(id);
  // }
}
