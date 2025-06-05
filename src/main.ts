import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { CONFIG_PIPES } from './shared/config/pipes.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SWAGGER_CUSTOM_OPTIONS,
  SWAGGER_CONFIG,
} from './shared/config/swagger.config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const pathToPublicStorage = configService.get<string>('pathToPublicStorage');
  const production = configService.get<string>('production');

  app.useGlobalFilters(new GlobalExceptionFilter());

  if (production == 'false') {
    const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG);
    SwaggerModule.setup('api', app, document, SWAGGER_CUSTOM_OPTIONS);
  }

  app.useGlobalPipes(CONFIG_PIPES);

  app.use('/uploads', express.static(pathToPublicStorage));

  app.enableCors();

  await app.listen(port);
}
bootstrap();
