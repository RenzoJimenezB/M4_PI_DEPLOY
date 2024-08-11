import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './CreateProductDto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.productsService.getProducts();
  }

  @HttpCode(200)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @HttpCode(201)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
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
