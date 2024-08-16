import { Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.getCategories();
  }

  //   @Post('seeder')
  //   create() {
  //     return this.categoriesService.addCategories();
  //   }
}
