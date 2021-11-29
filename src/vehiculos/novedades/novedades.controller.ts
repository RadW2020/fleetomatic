import { Body, Controller, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Novedad } from './novedad.entity';
import { NovedadDto } from './novedad.dto';
import { NovedadesService } from './novedades.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DB_ERRORS } from '../../types';

@ApiTags('novedades')
@Controller('vehiculos/:vehiculoId')
export class NovedadesController {
  constructor(private novedadesService: NovedadesService) {}

  @ApiResponse({
    status: 201,
    description: 'Modifica un vehículo',
    type: Novedad,
  })
  @Post('novedades')
  async createNovedad(
    @Param('vehiculoId', ParseIntPipe) vehiculoId: number,
    @Body() newNovedad: NovedadDto,
  ): Promise<Novedad> {
    try {
      const res = await this.novedadesService.createNovedad(vehiculoId, newNovedad);
      const customRes = Object.assign(res);
      customRes.vehiculoid = res.vehiculo.id;
      delete res.vehiculo;
      return customRes;
    } catch (err) {
      if (DB_ERRORS.includes(err.code)) {
        err.message = `Ese vehículo ID no existe`;
      }
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
