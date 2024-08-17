import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
// export class CategoriesRepository extends Repository<Category> {
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category | undefined> {
    return await this.repository.findOne({ where: { name } });
  }

  async addCategories(categories: CreateCategoryDto[]) {
    for (const category of categories) {
      const existingCategory = await this.repository.findOne({
        where: { name: category.name },
      });
      if (!existingCategory) {
        const newCategory = this.repository.create({ name: category.name });
        await this.repository.save(newCategory);
      }
    }
  }
}
