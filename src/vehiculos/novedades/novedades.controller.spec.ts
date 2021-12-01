import { Test, TestingModule } from '@nestjs/testing';
import { TIPO } from '../../types';
import { NovedadesController } from './novedades.controller';
import { NovedadesService } from './novedades.service';

const nDto = {
  asunto: 'EIPIAI',
  descripcion: 'Probando la api',
  tipo: TIPO.MECANICO,
};
const vehiculoIdDto = 1;
const fechaDto = 123456;

fdescribe('novedadesController', () => {
  let novedadesController: NovedadesController;
  const mockNovedadesService = {
    createNovedad: jest.fn((vid, dto) => {
      return {
        id: Date.now(),
        fecha: fechaDto,
        vehiculo: { id: vid },
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NovedadesController],
      providers: [NovedadesService],
    })
      .overrideProvider(NovedadesService)
      .useValue(mockNovedadesService)
      .compile();

    novedadesController = module.get<NovedadesController>(NovedadesController);
  });
  describe('novedad', () => {
    it('debe estar definido', () => {
      expect(novedadesController).toBeDefined();
    });
    it('debe crear una novedad', async () => {
      expect(await novedadesController.createNovedad(vehiculoIdDto, nDto)).toEqual({
        id: expect.any(Number),
        fecha: fechaDto,
        vehiculo: { id: vehiculoIdDto },
        ...nDto,
      });
      expect(mockNovedadesService.createNovedad).toHaveBeenCalled();
    });
  });
});
