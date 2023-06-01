import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { EnvironmentConfigService } from './config';
import { HttpExceptionFilter } from './core/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvironmentConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('The CRM Programming School API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(5000);
}
bootstrap().then();
