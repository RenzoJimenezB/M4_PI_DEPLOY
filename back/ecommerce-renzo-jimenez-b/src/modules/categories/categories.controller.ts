import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.getCategories();
  }

  @Post('seeder')
  seedCategories(@Body() categories: CreateCategoryDto[]) {
    return this.categoriesService.seedCategories(categories);
  }
}
