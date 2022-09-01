import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //GlobalPipe를 사용해서 유효성 검사를 하도록 설정한다.
  await app.listen(3000);
}
bootstrap();
