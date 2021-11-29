import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ESTADO } from '../types';

export class updateVehiculoDto {
  @ApiProperty({
    required: false,
    example: 'BMW',
    description: 'marca del vehículo. Catálogo',
  })
  @IsOptional()
  @IsString()
  marca: string;

  @ApiProperty({
    required: false,
    example: 2015,
    description: 'modelo del vehículo',
  })
  @IsOptional()
  @IsNumber()
  modelo: number;

  @ApiProperty({
    required: false,
    example: 'rosa',
    description: 'color del vehículo. Catálogo',
  })
  @IsOptional()
  @IsString()
  color: string;

  @ApiProperty({
    required: false,
    example: 'ACTIVO',
    description: 'Activo o Inactivo',
  })
  @IsOptional()
  @IsString()
  estado: ESTADO;

  @ApiProperty({
    required: false,
    example: true,
    description: 'Asignado o no asignado',
  })
  @IsOptional()
  @IsBoolean()
  asignado: boolean;
}
