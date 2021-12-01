import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';
import { VehiculoDto } from './vehiculo.dto';
import { IFilter } from '../types';
import { IPaginationMeta, IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { updateVehiculoDto } from './update-vehiculo.dto';
import { isDef } from '../tools';

const LIMITE_NOVEDADES = 3;

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculosRepository: Repository<Vehiculo>,
  ) {}
  async findAll(filter: IFilter, options: IPaginationOptions): Promise<Pagination<Vehiculo>> {
    const qb = this.vehiculosRepository.createQueryBuilder('v').leftJoinAndSelect('v.novedades', 'n');
    isDef(filter.asignado) ? qb.andWhere('v.asignado = :a', { a: filter.asignado }) : null;
    isDef(filter.color) ? qb.andWhere('v.color = :b', { b: filter.color }) : null;
    isDef(filter.estado) ? qb.andWhere('v.estado = :c', { c: filter.estado }) : null;
    isDef(filter.marca) ? qb.andWhere('v.marca = :d', { d: filter.marca }) : null;
    isDef(filter.modelo) ? qb.andWhere('v.modelo = :e', { e: filter.modelo }) : null;
    isDef(filter.asunto) ? qb.andWhere('n.asunto = :f', { f: filter.asunto }) : null;
    isDef(filter.descripcion) ? qb.andWhere('n.descripcion = :g', { g: filter.descripcion }) : null;
    isDef(filter.tipo) ? qb.andWhere('n.tipo = :h', { h: filter.tipo }) : null;
    qb.getMany();

    return paginate<Vehiculo, IPaginationMeta>(qb, options);
  }

  async findVehiculo(vehiculoId: number): Promise<Vehiculo> {
    const vehiculoConNovedades = await this.vehiculosRepository
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.novedades', 'novedad')
      .where('v.id = :vid', { vid: vehiculoId })
      .limit(LIMITE_NOVEDADES)
      .orderBy('fecha', 'DESC')
      .getOne();
    return vehiculoConNovedades;
  }

  createVehiculo(nuevoVehiculo: VehiculoDto) {
    const vehiculo: Vehiculo = Object.assign(nuevoVehiculo);
    const date = new Date();
    vehiculo.fechaingreso = date.toISOString();
    return this.vehiculosRepository.save(nuevoVehiculo);
  }

  deleteVehiculo(vehiculoId: number): Promise<DeleteResult> {
    return this.vehiculosRepository.delete(vehiculoId);
  }

  async updateVehiculo(vehiculoId: number, actualizaVehiculo: updateVehiculoDto): Promise<Vehiculo> {
    const toUpdate = await this.vehiculosRepository.findOne(vehiculoId);
    if (toUpdate === undefined || toUpdate === null) {
      throw new HttpException(
        {
          message: `Vehículo ${vehiculoId} no existe`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const updated: Vehiculo & VehiculoDto = Object.assign(toUpdate, actualizaVehiculo);

    return this.vehiculosRepository.save(updated);
  }
}
