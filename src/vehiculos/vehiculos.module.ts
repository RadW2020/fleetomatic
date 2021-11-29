import { CacheModule, Module } from '@nestjs/common';
import { Vehiculo } from './vehiculo.entity';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo]), CacheModule.register()],
  providers: [VehiculosService],
  controllers: [VehiculosController],
})
export class VehiculosModule {}
