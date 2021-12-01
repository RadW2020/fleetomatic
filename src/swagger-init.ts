import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocumentation {
  static initialize(app: INestApplication): void {
    const options = new DocumentBuilder().setTitle('Flee O Matic REST API').setDescription('API REST de vehículos y novedades').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }
}
