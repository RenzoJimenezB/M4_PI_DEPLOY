import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.interface';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './CreateProductDto';
import { validateData } from 'src/helpers/validateData';

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
      await validateData(productDto);
      return this.productsRepository.createProduct(productDto);
    } catch (error) {
      throw error;
    }
  }

  updateProduct(id: number) {
    return this.productsRepository.updateProduct(id);
  }

  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
