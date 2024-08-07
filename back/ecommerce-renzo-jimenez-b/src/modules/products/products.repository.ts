import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  private products = [
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

  async getProducts() {
    return this.products;
  }
}
