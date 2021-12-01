import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { NovedadesModule } from './vehiculos/novedades/novedades.module';
import { POSTGRES_CONN } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(POSTGRES_CONN), VehiculosModule, NovedadesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
