import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Imgs, ImgsSchema } from './schema/img.schema';
import { NestCloudinaryClientModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Imgs.name, schema: ImgsSchema }]),
    NestCloudinaryClientModule,
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
