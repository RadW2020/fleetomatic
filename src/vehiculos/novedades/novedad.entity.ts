import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TIPO } from '../../types';
import { Vehiculo } from '../vehiculo.entity';

@Entity()
export class Novedad {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'identificador unico de la novedad', example: 123 })
  id: number;

  @ApiProperty({ description: 'asunto de la novedad', example: 'GPS' })
  @Column()
  asunto: string;

  @ApiProperty({ description: 'descripcion de la novedad', example: 'Actualización Navegación GPS versión 6.0' })
  @Column('text')
  descripcion: string;

  @ApiProperty({ description: 'tipo de la novedad', example: 'MANTENIMIENTO' })
  @IsEnum(TIPO)
  @Column()
  tipo: TIPO;

  @ApiProperty({ description: 'fecha de la novedad', example: '2021-10-05T14:48:00.000Z' })
  @Column()
  fecha: string;

  @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.novedades, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  vehiculo: Vehiculo;
}
