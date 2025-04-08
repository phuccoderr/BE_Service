import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { GlobalException } from 'src/config/global-exception.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors();

  // Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory(errors) {
        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          error: errors
            .map((error) =>
              error.constraints ? Object.values(error.constraints) : [],
            )
            .flat(),
        });
      },
    }),
  );

  // Validation Global
  app.useGlobalFilters(new GlobalException());

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Quản lý gói cước')
    .setDescription('Đây là api dành cho các trang web dịch vụ gói cước')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
