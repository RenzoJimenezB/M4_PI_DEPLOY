import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepository } from './files.repository';
import { ProductsModule } from '../products/products.module';
import { CloudinaryConfig } from '../../config/cloudinary';

@Module({
  imports: [ProductsModule],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, CloudinaryConfig],
})
export class FilesModule {}
