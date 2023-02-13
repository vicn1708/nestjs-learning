import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from 'nestjs-cloudinary';

@Module({
  imports: [
    CloudinaryModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: (configService: ConfigService) => ({
        isGlobal: true,
        cloud_name: configService.get('CLOUDINARY_NAME'),
        api_key: configService.get('CLOUDINARY_API_KEY'),
        api_secret: configService.get('CLOUDINARY_API_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class NestCloudinaryClientModule {}
