import { Category } from 'src/entities/categories.entity';
import { Injectable } from '@nestjs/common';
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
  //   return this.categoriesRepository.addCategories(categories);
  // }
}
