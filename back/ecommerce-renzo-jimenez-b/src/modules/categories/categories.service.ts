import { Category } from 'src/entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  // async addCategories() {
  //   return this.categoriesRepository.save();
  // }
}
