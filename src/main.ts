import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerDocumentation } from './swagger-init';

async function fleetomatic() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`api/v1`);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerDocumentation.initialize(app);
  await app.listen(process.env.PORT || 3000);
}
fleetomatic();
