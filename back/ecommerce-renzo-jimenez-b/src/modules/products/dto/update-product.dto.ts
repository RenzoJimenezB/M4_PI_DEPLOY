import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Category } from 'src/modules/categories/entities/categories.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {}
