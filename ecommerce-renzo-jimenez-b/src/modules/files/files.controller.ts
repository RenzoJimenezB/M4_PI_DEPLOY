import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  // FileInterceptor() parses the incoming multipart form data
  // ('parameter'): name of the form field in the multipart request
  uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024,
            message: 'File size exceeds the allowed limit of 200KB',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    // @UploadedFile() extracts the uploaded file from the request
  ) {
    return this.filesService.uploadImage(productId, file);
  }
}
