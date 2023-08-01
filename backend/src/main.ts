import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exception';
import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    limit: 20,
    maxLimit: 100,
    alwaysPaginate: true,
    cache: false,
  },
  routes: {
    exclude: ['createManyBase', 'replaceOneBase'],
  },
});

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.disable('x-powered-by');
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'x-api-version',
  });
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setVersion('3.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({ origin: process.env.CORS });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
