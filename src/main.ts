import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Biologi Backend API')
    .setDescription('API untuk aplikasi biologi dengan sistem user, scoring, dan quiz')
    .setVersion('1.0')
    .addTag('users', 'Operasi CRUD untuk User')
    .addTag('scores', 'Operasi CRUD untuk Score dan Leaderboard')
    .addTag('questions', 'Operasi untuk mengelola soal-soal kuis')
    .addTag('quiz', 'Operasi untuk sesi kuis, jawaban, dan history')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `Swagger documentation: http://localhost:${process.env.PORT ?? 3000}/api-docs`,
  );
}
bootstrap();
