import { Module } from '@nestjs/common';
import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Imgs, ImgsSchema } from './schema/img.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Imgs.name, schema: ImgsSchema }]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: 'src/images',
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [UploadFileController],
  providers: [UploadFileService],
})
export class UploadFileModule {}
