import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TIPO } from '../../types';

export class NovedadDto {
  @ApiProperty({ required: true, example: 'GPS' })
  @IsNotEmpty()
  @IsString()
  readonly asunto: string;

  @ApiProperty({
    required: true,
    example: 'Actualización Navegación GPS versión 6.0',
  })
  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;

  @ApiProperty({ required: true, example: 'MANTENIMIENTO' })
  @IsNotEmpty()
  @IsString()
  readonly tipo: TIPO;
}
