import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { ProductsRepository } from '../products/products.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    private filesRepository: FilesRepository,
    private productsRepository: ProductsRepository,

    // @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async uploadImage(productId: string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOneById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const uploadedImage = await this.filesRepository
      .uploadImage(file)
      .catch((error) => {
        console.error('Image upload failed.', error);
        throw new InternalServerErrorException('Failed to upload image');
      });

    console.log(uploadedImage);

    try {
      await this.productsRepository.updateProduct(productId, {
        imgUrl: uploadedImage.secure_url,
      });
    } catch (error) {
      console.error('Database update failed, deleting uploaded image...');
      await this.filesRepository.deleteImage(uploadedImage.public_id);

      throw error;
    }

    return await this.productsRepository.findOneById(productId);
    // return { ...product, imgUrl: uploadedImage.secure_url };
  }
}
