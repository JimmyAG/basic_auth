import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('API for authentication system')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT Auth button
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Docs at /api

  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
