import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FilesRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        // initialises the uploading process
        // upload_stream() creates a writable stream
        // writable stream: a connection to the cloud service
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
      // file.buffer is the raw binary data of the uploaded file
      // toStream converts the file data into a readable stream
      // the stream is piped into the upload stream
    });
  }

  deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Failed to delete image:', error);

          reject(
            new InternalServerErrorException(
              'Failed to delete image from cloud storage',
            ),
          );
        } else if (result.result !== 'ok') {
          console.error('Image deletion returned an unexpected result', result);

          reject(
            new InternalServerErrorException(
              'Unexpected result during image deletion',
            ),
          );
        } else {
          resolve();
        }
      });
    });
  }
}
