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
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'product 1',
  //     description: 'description 1',
  //     price: 100,
  //     stock: true,
  //     imgUrl: 'url 1',
  //   },
  //   {
  //     id: 2,
  //     name: 'product 2',
  //     description: 'description 2',
  //     price: 200,
  //     stock: true,
  //     imgUrl: 'url 2',
  //   },
  //   {
  //     id: 3,
  //     name: 'product 3',
  //     description: 'description 3',
  //     price: 300,
  //     stock: false,
  //     imgUrl: 'url 3',
  //   },
  //   {
  //     id: 4,
  //     name: 'product 4',
  //     description: 'description 4',
  //     price: 400,
  //     stock: false,
  //     imgUrl: 'url 4',
  //   },
  // ];

  async findAll(page: number, limit: number): Promise<PaginatedProductsDto> {
    // dto?
    const skip = (page - 1) * limit;
    const take = limit;
    console.log(`returning items from indices ${skip} to ${skip + take - 1}`);

    const [results, total] = await this.repository.findAndCount({
      skip,
      take,
    });

    return {
      data: results,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneById(id: UUID): Promise<Product> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async save(createProductDto: CreateProductDto) {
    const category = await this.categoriesRepository.findByName(
      createProductDto.category,
    );

    if (!category) {
      throw new Error(
        `Category with name ${createProductDto.category} not found`,
      );
    }

    const newProduct = await this.repository.save({
      ...createProductDto,
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

  async updateProduct(id: number) {
    return `Product with id ${id} has been updated`;
  }

  async deleteProduct(id: number) {
    return `Product with id ${id} has been deleted`;
  }
}
