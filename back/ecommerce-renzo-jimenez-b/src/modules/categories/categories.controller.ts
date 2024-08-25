import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  // @Post('seeder')
  // seedCategories(@Body() categories: CreateCategoryDto[]) {
  //   return this.categoriesService.seedCategories(categories);
  // }
}
