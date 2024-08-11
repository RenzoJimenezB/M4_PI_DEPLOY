import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.interface';
import { CreateProductDto } from './createProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  findAll() {
    return this.productsService.getProducts();
  }

  @HttpCode(200)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @HttpCode(201)
  @Post()
  create(@Body() createProduct: CreateProductDto) {
    return this.productsService.createProduct(createProduct);
  }

  @HttpCode(200)
  @Put(':id')
  updateProduct(@Param('id') id: string) {
    return this.productsService.updateProduct(Number(id));
  }

  @HttpCode(200)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
