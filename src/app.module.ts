import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './server/users/users.module';
import { connectDB } from './config/mongodb/db.connect';
import { AuthModule } from './server/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UploadFileModule } from './server/upload-file/upload-file.module';
import cloudinary from './config/cloudinay/cloudinary.config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.url_connect || connectDB),
    AuthModule,
    UsersModule,
    UploadFileModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule {}
