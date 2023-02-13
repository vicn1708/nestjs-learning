import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { CloudinaryService } from 'nestjs-cloudinary';
import { Imgs } from './schema/img.schema';

@Controller('upload')
export class UploadFileController {
  constructor(
    private readonly uploadFileService: UploadFileService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //* Upload single file
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    if (file != null || file != undefined) {
      return await this.cloudinaryService
        .uploadFile(file, {
          public_id: `nestjs-${Date.now()}`,
          folder: 'nestjs_learning',
          allowed_formats: ['png', 'jpg'],
          resource_type: 'auto',
        })
        .then((file) => this.uploadFileService.uploadFileToDb(file.secure_url));
    }
    return { msg: 'not file to upload' };
  }

  //* Upload multiple file
  @Post('multiple')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadMultipleFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    if (files.length > 0) {
      files.map((file) => {
        this.cloudinaryService
          .uploadFile(file, {
            public_id: `nestjs-${Date.now()}`,
            folder: 'nestjs_learning',
            allowed_formats: ['png', 'jpg'],
            resource_type: 'auto',
          })
          .then((file) =>
            this.uploadFileService.uploadFileToDb(file.secure_url),
          );
      });
      return { msg: 'upload files successfuly' };
    }
    return { msg: 'not file to upload' };
  }
}
