import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  // FileInterceptor() parses the incoming multipart form data
  // ('parameter'): name of the form field in the multipart request
  uploadImage(
    @Param('id') productId: string,
    @UploadedFile() file: Express.Multer.File,
    // @UploadedFile() extracts the uploaded file from the request
  ) {
    return this.filesService.uploadImage(productId, file);
  }
}
