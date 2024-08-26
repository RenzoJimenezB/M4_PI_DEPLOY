import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { PaginatedProductsDto } from './dto/paginated-products.dto';
import { CategoriesRepository } from '../categories/categories.repository';
import * as data from 'src/utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
    private categoriesRepository: CategoriesRepository,
  ) {}

  async findAll(page: number, limit: number): Promise<PaginatedProductsDto> {
    const skip = (page - 1) * limit;
    const take = limit;
    console.log(`returning items from indices ${skip} to ${skip + take - 1}`);

    const [results, total] = await this.repository.findAndCount({
      skip,
      take,
      relations: { category: true },
    });

    const inStock = results.filter((product) => product.stock > 0);

    return {
      data: inStock,
      count: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneById(id: string): Promise<Product> {
    return this.repository.findOneBy({ id });
  }

  async addProducts() {
    // Fetch all categories once and map by name for quick lookup
    const categories = await this.categoriesRepository.findAll();
    const categoryMap = new Map(
      categories.map((category) => [category.name, category]),
    );

    const products = data.map((element) => {
      const category = categoryMap.get(element.category);
      // const category = categories.find(
      //   (category) => category.name === element.category,
      // );

      return {
        name: element.name,
        description: element.description,
        price: element.price,
        stock: element.stock,
        category,
      };
    });

    await this.repository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(products)
      .orUpdate(['description', 'price', 'stock'], ['name'])
      .execute();

    return `New products: ${products.map((product) => product.name)}`;
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

  // async deleteProduct(id: number) {
  //   return `Product with id ${id} has been deleted`;
  // }
}
