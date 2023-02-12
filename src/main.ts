import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as admin from 'firebase-admin';
import { serviceAccount } from './config/firebase/key';

async function bootstrap() {
  const port = process.env.port || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //* config swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //* config view engine ejs
  app.useStaticAssets(join(__dirname, '..', 'src/client/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/client/views'));
  app.setViewEngine('ejs');

  //* connect firebase
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  });

  await app.listen(port);
  console.log(`http://localhost:${port}/`);
}
bootstrap();
