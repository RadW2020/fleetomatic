import { Module } from '@nestjs/common';
import { Novedad } from './novedad.entity';
import { NovedadesService } from './novedades.service';
import { NovedadesController } from './novedades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Novedad])],
  providers: [NovedadesService],
  controllers: [NovedadesController],
})
export class NovedadesModule {}
