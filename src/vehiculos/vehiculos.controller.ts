import { Body, CacheInterceptor, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { Vehiculo } from './vehiculo.entity';
import { VehiculoDto } from './vehiculo.dto';
import { VehiculosService } from './vehiculos.service';
import { DeleteResult } from 'typeorm';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pagination, PaginationTypeEnum } from 'nestjs-typeorm-paginate';
import { updateVehiculoDto } from './update-vehiculo.dto';
import { ModeloIntPipe } from '../pipes';
import { ESTADO, TIPO } from '../types';

@ApiTags('vehiculos')
@Controller('vehiculos')
@UseInterceptors(CacheInterceptor)
export class VehiculosController {
  constructor(private vehiculosService: VehiculosService) {}
  /**
   *
   * @param {PaginateQuery} query lista de parámetros para filtrar
   * @returns Devuelve una lista de vehículos paginada
   */
  @ApiResponse({
    status: 200,
    description: 'Devuelve una lista de vehículos paginada',
  })
  @ApiQuery({ name: 'page', description: 'numero de página', example: 1, required: false })
  @ApiQuery({ name: 'limit', description: 'elementos por página', example: 10, required: false })
  @ApiQuery({ name: 'marca', description: 'marca del vehículo', example: 'FORD', required: false })
  @ApiQuery({ name: 'modelo', description: 'modelo del vehículo', example: 2019, required: false })
  @ApiQuery({ name: 'color', description: 'color del vehículo', example: 'BLANCO', required: false })
  @ApiQuery({ name: 'estado', description: 'estado del vehículo. ACTIVO o INACTIVO', example: 'ACTIVO', required: false })
  @ApiQuery({ name: 'asignado', description: 'Vehículo asignado', example: true, required: false })
  @ApiQuery({ name: 'asunto', description: 'asunto de la novedad', example: 'Tapicería', required: false })
  @ApiQuery({ name: 'descripcion', description: 'descripción de la novedad', example: 'cambio asientos', required: false })
  @ApiQuery({ name: 'tipo', description: 'tipo de la novedad: MECANICO, MULTA, MANTENIMIENTO, ACCIDENTE', example: 'MANTENIMIENTO', required: false })
  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('marca') marca?: string,
    @Query('modelo', ModeloIntPipe) modelo?: number,
    @Query('color') color?: string,
    @Query('estado') estado?: ESTADO,
    @Query('asignado') asignado?: boolean,
    @Query('asunto') asunto?: string,
    @Query('descripcion') descripcion?: string,
    @Query('tipo') tipo?: TIPO,
  ): Promise<Pagination<Vehiculo>> {
    limit = limit > 100 ? 100 : limit;
    const filter = { marca, modelo, color, estado, asignado, asunto, descripcion, tipo };
    try {
      const res = await this.vehiculosService.findAll(filter, {
        page,
        limit,
        paginationType: PaginationTypeEnum.TAKE_AND_SKIP,
      });
      return res;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   *
   * @param {number} vehiculoId Identificador del vehículo
   * @returns Datos del vehículo buscado
   */
  @ApiResponse({
    status: 200,
    description: 'Devuelve los datos de un vehículo',
    type: Vehiculo,
  })
  @ApiResponse({
    status: 400,
    description: 'Vehiculo no encontrado',
  })
  @Get(':vehiculoId')
  async findVehiculo(@Param('vehiculoId', ParseIntPipe) vehiculoId: number): Promise<Vehiculo> {
    const res = await this.vehiculosService.findVehiculo(vehiculoId);
    if (res === undefined || res === null) {
      throw new HttpException(
        {
          message: `vehículo id:${vehiculoId} no existe`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }

  /**
   *
   * @body {VehiculoDto} nuevoVehiculo Datos del vehículo a crear
   * @returns {Vehiculo} Datos del vehículo creado
   */
  @ApiResponse({
    status: 200,
    description: 'Crea un nuevo vehículo',
    type: Vehiculo,
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la creación',
  })
  @Post()
  createVehiculo(@Body() nuevoVehiculo: VehiculoDto): Promise<Vehiculo> {
    return this.vehiculosService.createVehiculo(nuevoVehiculo);
  }

  @ApiResponse({
    status: 200,
    description: 'Borra un vehículo',
  })
  @ApiResponse({
    status: 400,
    description: 'Vehiculo no encontrado',
  })
  @Delete(':vehiculoId')
  async deleteVehiculo(@Param('vehiculoId', ParseIntPipe) vehiculoId: number): Promise<DeleteResult> {
    const res = await this.vehiculosService.deleteVehiculo(vehiculoId);
    delete res.raw;
    if (res.affected === 0) {
      throw new HttpException(
        {
          message: `vehículo id:${vehiculoId} no existe`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return res;
  }

  @ApiResponse({
    status: 200,
    description: 'Modifica un vehículo',
    type: Vehiculo,
  })
  @ApiResponse({
    status: 400,
    description: 'Vehiculo no existe',
    type: Vehiculo,
  })
  @Put(':vehiculoId')
  async updateVehiculo(@Param('vehiculoId', ParseIntPipe) vehiculoId: number, @Body() actualizaVehiculo: updateVehiculoDto): Promise<Vehiculo> {
    try {
      return await this.vehiculosService.updateVehiculo(vehiculoId, actualizaVehiculo);
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
