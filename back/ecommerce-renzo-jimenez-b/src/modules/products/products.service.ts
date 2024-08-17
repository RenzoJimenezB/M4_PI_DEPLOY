import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { validateData } from 'src/helpers/validateData';
import { Product } from 'src/entities/products.entity';
import { PaginatedProductsDto } from './dto/paginated-products.dto';
import { UUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async getProducts(
    page: number,
    limit: number,
  ): Promise<PaginatedProductsDto> {
    // dto?
    return this.productsRepository.findAll(page, limit);
  }

  // return data only:
  // async getProducts(page: number, limit: number): Promise<Product[]> {
  //   const { data } = await this.productsRepository.findAll(page, limit);
  //   return data;
  // }

  getProductById(id: UUID): Promise<Product> {
    return this.productsRepository.findOneById(id);
  }

  async createProduct(createProductDto: CreateProductDto) {
    const productDto = plainToInstance(CreateProductDto, createProductDto);

    try {
      await validateData(productDto);
      return this.productsRepository.save(productDto);
    } catch (error) {
      throw error;
    }
  }

  async seedProducts(products: CreateProductDto[]) {
    return this.productsRepository.seedProducts(products);
  }

  updateProduct(id: number) {
    return this.productsRepository.updateProduct(id);
  }

  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
