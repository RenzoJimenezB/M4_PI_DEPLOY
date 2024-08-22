import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { PaginatedProductsDto } from './dto/paginated-products.dto';
import { CategoriesRepository } from '../categories/categories.repository';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async findAll(page: number, limit: number): Promise<PaginatedProductsDto> {
    // dto?
    const skip = (page - 1) * limit;
    const take = limit;
    console.log(`returning items from indices ${skip} to ${skip + take - 1}`);

    const [results, total] = await this.repository.findAndCount({
      skip,
      take,
      relations: { category: true },
    });

    return {
      data: results,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneById(id: string): Promise<Product> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async create(product: CreateProductDto) {
    const category = await this.categoriesRepository.findByName(
      product.category,
    );

    if (!category) {
      throw new Error(`Category with name ${product.category} not found`);
    }

    const newProduct = await this.repository.save({
      ...product,
      category,
    });
    return newProduct.id;
  }

  async seedProducts(products: CreateProductDto[]) {
    for (const product of products) {
      const category = await this.categoriesRepository.findByName(
        product.category,
      );

      if (!category) {
        throw new Error(`Category with name ${product.category} not found`);
      }

      const existingProduct = await this.repository.findOne({
        where: { name: product.name },
      });
      if (!existingProduct) {
        const newProduct = this.repository.create({
          ...product,
          category,
        });
        await this.repository.save(newProduct);
      }
    }
  }

  async updateProduct(id: string, updateData: Partial<Product>) {
    const product = await this.repository.findOneBy({ id });

    if (product) {
      Object.assign(product, updateData);
      await this.repository.save(product);
    }
    return `Product with id ${id} has been updated`;
  }

  async deleteProduct(id: number) {
    return `Product with id ${id} has been deleted`;
  }
}
