import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { In, Repository } from 'typeorm';
import * as data from 'src/utils/data.json';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
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

  async addCategories() {
    // Extract the category names from input data and filter duplicates
    const categoryNames = Array.from(
      new Set(data.map((element) => element.category)),
    );

    // Find existing categories in the database
    const existingCategories = await this.repository.find({
      where: { name: In(categoryNames) },
    });

    // Extract the names of existing categories
    const existingCategoryNames = existingCategories.map(
      (category) => category.name,
    );

    // Filter out existing categories and prepare new categories for insertion
    const newCategories = categoryNames
      .filter((name) => !existingCategoryNames.includes(name))
      .map((name) => this.repository.create({ name }));

    // Insert new categories if any exist
    if (newCategories.length > 0) {
      await this.repository.save(newCategories);
    }
  }

  // async seedCategories(categories: CreateCategoryDto[]) {
  //   for (const category of categories) {
  //     const existingCategory = await this.repository.findOne({
  //       where: { name: category.name },
  //     });

  //     if (!existingCategory) {
  //       const newCategory = this.repository.create({ name: category.name });
  //       await this.repository.save(newCategory);
  //     }
  //   }

  //   return 'New categories have been added sucessfully';
  // }
}
