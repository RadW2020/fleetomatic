import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isDef } from './tools';

@Injectable()
export class ModeloIntPipe implements PipeTransform {
  async transform(value: string) {
    try {
      if (isDef(value)) {
        return parseInt(value);
      }
    } catch (err) {
      throw new BadRequestException('Error en el valor del modelo');
    }
  }
}
