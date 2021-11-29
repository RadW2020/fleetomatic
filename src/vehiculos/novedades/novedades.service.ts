import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from '../vehiculo.entity';
import { NovedadDto } from './novedad.dto';
import { Novedad } from './novedad.entity';

@Injectable()
export class NovedadesService {
  constructor(
    @InjectRepository(Novedad)
    private novedadesRepository: Repository<Novedad>,
  ) {}
  createNovedad(vehiculoId: number, newNovedad: NovedadDto) {
    const novedad: Novedad = Object.assign(newNovedad);
    novedad.vehiculo = new Vehiculo();
    novedad.vehiculo.id = vehiculoId;
    const date = new Date();
    novedad.fecha = date.toISOString();
    return this.novedadesRepository.save(novedad);
  }
}
