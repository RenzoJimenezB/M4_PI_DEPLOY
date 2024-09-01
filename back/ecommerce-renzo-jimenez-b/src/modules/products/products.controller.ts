import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { Product } from './entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return this.productsService.getProducts(page, limit);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @Get('seeder')
  @HttpCode(HttpStatus.OK)
  addProducts() {
    return this.productsService.addProducts();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  create(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() updateData: Partial<Product>) {
    return this.productsService.updateProduct(id, updateData);
  }

  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // @UseGuards(AuthGuard)
  // deleteProduct(@Param('id') id: string) {
  //   return this.productsService.deleteProduct(Number(id));
  // }
}
