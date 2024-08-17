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
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { UUID } from 'crypto';
import { Product } from 'src/entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.productsService.getProducts(page, limit);
  }

  @HttpCode(200)
  @Get(':id')
  findById(@Param('id') id: UUID) {
    return this.productsService.getProductById(id);
  }

  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Post('seeder')
  seedProducts(@Body() products: CreateProductDto[]) {
    return this.productsService.seedProducts(products);
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string) {
    return this.productsService.updateProduct(Number(id));
  }

  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(Number(id));
  }
}
