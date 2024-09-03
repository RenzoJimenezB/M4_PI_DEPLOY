import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { PaginatedProductsDto } from './dto/paginated-products.dto';
import { CategoriesRepository } from '../categories/categories.repository';
import * as data from 'src/utils/data.json';
import { ProductIdDto } from './dto/product-id.dto';
import { ProcessedProductsDto } from './dto/processed-products-dto';

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

  async findOneById(id: string, manager?: EntityManager): Promise<Product> {
    const repository = manager
      ? manager.getRepository(Product)
      : this.repository;

    return repository.findOneBy({ id });
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
      // .orUpdate(['description', 'price', 'stock'], ['name'])
      .orIgnore()
      .execute();
  }

  async create(product: CreateProductDto): Promise<string> {
    const category = await this.categoriesRepository.findByName(
      product.category,
    );

    if (!category) {
      throw new NotFoundException(
        `Category with name ${product.category} not found`,
      );
    }

    const existingProduct = await this.repository.findOne({
      where: { name: product.name },
    });

    if (existingProduct) {
      throw new ConflictException(
        `Product with name ${product.name} already exists`,
      );
    }

    const newProduct = await this.repository.save({
      ...product,
      category,
    });

    return newProduct.id;
  }

  async updateProduct(
    id: string,
    updateData: Partial<Product>,
    manager?: EntityManager,
  ) {
    const repository = manager
      ? manager.getRepository(Product)
      : this.repository;

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No update data provided');
    }

    await repository.update(id, updateData);

    const updatedProduct = await repository.findOneBy({ id });

    // const product = await this.repository.findOneBy({ id });

    // if (product) {
    //   Object.assign(product, updateData);
    //   await this.repository.save(product);
    // }

    console.log(`Product with id ${id} has been updated`);
    return updatedProduct;
  }

  // async deleteProduct(id: number) {
  //   return `Product with id ${id} has been deleted`;
  // }

  async processProducts(
    productIds: Partial<Product>[],
    manager: EntityManager,
    // productIds: ProductIdDto[],
  ): Promise<ProcessedProductsDto> {
    const products = [];
    let totalPrice = 0;

    for (const product of productIds) {
      // ProductIdDto validation would ensure every product has an id
      if (!product.id) {
        throw new BadRequestException('Product ID is missing');
      }

      const orderProduct = await this.findOneById(product.id, manager);

      if (!orderProduct) {
        throw new NotFoundException(`Product with ID ${product.id} not found`);
      }

      const updatedStock = orderProduct.stock - 1;
      await this.updateProduct(
        orderProduct.id,
        { stock: Math.max(updatedStock, 0) },
        manager,
      );

      totalPrice += orderProduct.price;
      products.push(orderProduct);
    }

    return { products, totalPrice };
  }
}
