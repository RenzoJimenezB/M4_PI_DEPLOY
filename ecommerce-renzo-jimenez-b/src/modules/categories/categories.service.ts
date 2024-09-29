import { Injectable } from '@nestjs/common';
import { Category } from './entities/categories.entity';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  async addCategories() {
    return this.categoriesRepository.addCategories();
  }

  // async seedCategories(categories: CreateCategoryDto[]) {
  //   return this.categoriesRepository.seedCategories(categories);
  // }
}
