import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.interface';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './createProduct.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  getProducts(): Promise<Product[]> {
    return this.productsRepository.getProducts();
  }

  getProductById(id: number): Promise<Product> {
    return this.productsRepository.getById(id);
  }

  async createProduct(createProductDto: CreateProductDto) {
    const productDto = plainToInstance(CreateProductDto, createProductDto);

    try {
      await validateOrReject(productDto);
      return this.productsRepository.createProduct(productDto);
    } catch (errors) {
      throw new BadRequestException('Validation failed', errors);
    }

    // return this.productsRepository.createProduct(product);
  }

  updateProduct(id: number) {
    return this.productsRepository.updateProduct(id);
  }

  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
