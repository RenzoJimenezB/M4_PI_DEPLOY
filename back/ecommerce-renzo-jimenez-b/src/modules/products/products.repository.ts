import { Injectable } from '@nestjs/common';
import { Product } from './products.interface';
import { CreateProductDto } from './CreateProductDto';

@Injectable()
export class ProductsRepository {
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'description 1',
      price: 100,
      stock: true,
      imgUrl: 'url 1',
    },
    {
      id: 2,
      name: 'product 2',
      description: 'description 2',
      price: 200,
      stock: true,
      imgUrl: 'url 2',
    },
    {
      id: 3,
      name: 'product 3',
      description: 'description 3',
      price: 300,
      stock: false,
      imgUrl: 'url 3',
    },
    {
      id: 4,
      name: 'product 4',
      description: 'description 4',
      price: 400,
      stock: false,
      imgUrl: 'url 4',
    },
  ];

  async getProducts(page: number, limit: number) {
    // return this.products;

    const start = (page - 1) * limit;
    const end = start + limit;
    console.log(`returning items from indices ${start} to ${end - 1}`);

    return this.products.slice(start, end);
  }

  async getById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  async createProduct(createProductDto: CreateProductDto) {
    const id = this.products.length + 1;
    this.products = [
      ...this.products,
      {
        id,
        ...createProductDto,
        stock: true,
      },
    ];
    return { id };
  }

  async updateProduct(id: number) {
    return `Product with id ${id} has been updated`;
  }

  async deleteProduct(id: number) {
    return `Product with id ${id} has been deleted`;
  }
}
