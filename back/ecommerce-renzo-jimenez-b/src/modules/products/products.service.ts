import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { validateData } from 'src/helpers/validateData';
import { Product } from './entities/products.entity';
import { PaginatedProductsDto } from './dto/paginated-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesRepository } from '../categories/categories.repository';
import { Category } from '../categories/entities/categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async getProducts(
    page: number,
    limit: number,
  ): Promise<PaginatedProductsDto> {
    return this.productsRepository.findAll(page, limit);
  }

  async getProductById(id: string): Promise<Product> {
    return this.productsRepository.findOneById(id);
  }

  async addProducts() {
    return this.productsRepository.addProducts();
  }

  async createProduct(product: CreateProductDto) {
    return this.productsRepository.create(product);

    // const productDto = plainToInstance(CreateProductDto, product);

    // try {
    //   await validateData(productDto);
    //   return this.productsRepository.create(productDto);
    // } catch (error) {
    //   throw error;
    // }
  }

  async updateProduct(id: string, updateData: UpdateProductDto) {
    let dbCategory: Category | undefined = undefined;

    if (updateData.category) {
      const category = await this.categoriesRepository.findById(
        updateData.category,
      );

      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateData.category} not found`,
        );
      }
      dbCategory = category;
    }

    return this.productsRepository.updateProduct(id, {
      ...updateData,
      category: dbCategory,
    });
  }

  // deleteProduct(id: number) {
  //   return this.productsRepository.deleteProduct(id);
  // }
}
