import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfigService } from './config/app';
import { HttpExceptionFilter } from './core/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  const config = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('The CRM Programming School API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  const appConfigService = app.get(AppConfigService);

  await app.listen(appConfigService.port, appConfigService.host, () => {
    const url = `http://${appConfigService.host}:${appConfigService.port}`;
    Logger.log(`Server started ${url}`);
    Logger.log(`Swagger started ${url}/docs`);
  });
}
void bootstrap();
