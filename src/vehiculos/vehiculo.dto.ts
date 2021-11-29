import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ESTADO } from '../types';

export class VehiculoDto {
  @ApiProperty({
    required: true,
    example: 'BMW',
    description: 'marca del vehículo. Catálogo',
  })
  @IsNotEmpty()
  @IsString()
  marca: string;

  @ApiProperty({
    required: true,
    example: 2015,
    description: 'modelo del vehículo',
  })
  @IsNotEmpty()
  @IsNumber()
  modelo: number;

  @ApiProperty({
    required: true,
    example: 'rosa',
    description: 'color del vehículo. Catálogo',
  })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({
    required: true,
    example: 'ACTIVO',
    description: 'Activo o Inactivo',
  })
  @IsNotEmpty()
  @IsString()
  estado: ESTADO;

  @ApiProperty({
    required: true,
    example: true,
    description: 'Asignado o no asignado',
  })
  @IsNotEmpty()
  @IsBoolean()
  asignado: boolean;
}
