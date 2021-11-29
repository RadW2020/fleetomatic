import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ESTADO } from '../types';
import { Novedad } from './novedades/novedad.entity';

@Entity()
export class Vehiculo {
  @ApiProperty({ description: 'Identificador único', example: 123 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Marca del vehículo', example: 'BMW' })
  @Column('varchar', { length: 100 })
  marca: string;

  @ApiProperty({ description: 'Modelo del vehículo', example: 2016 })
  @Column('int')
  modelo: number;

  @ApiProperty({ description: 'Color del vehículo', example: 'Negro' })
  @Column()
  color: string;

  @ApiProperty({ description: 'Fecha de ingreso', example: '2021-10-05T14:48:00.000Z' })
  @Column('date')
  fechaingreso: string;

  @ApiProperty({
    description: 'Estado del Vehículo: ACTIVO o INACTIVO',
    example: 'ACTIVO',
    enum: ESTADO,
  })
  @IsEnum(ESTADO)
  @IsString()
  @Column()
  estado: ESTADO;

  @ApiProperty({ description: 'Vehículo asignado: true o false', example: true })
  @Column()
  asignado: boolean;

  @OneToMany(() => Novedad, (novedad) => novedad.vehiculo)
  novedades: Novedad[];
}
