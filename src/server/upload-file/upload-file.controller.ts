import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Express, Response } from 'express';

@Controller('upload')
export class UploadFileController {
  constructor(private readonly uploadFileService: UploadFileService) {}

  //* Upload single file
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(file);
    await this.uploadFileService.uploadSingleFile(file);
    return res.json('upload single file');
  }

  //* Upload multiple file
  @Post('multiple')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadMultipleFiles(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    await this.uploadFileService.uploadMultipleFile(files);
    return res.json('upload multiple file');
  }
}
