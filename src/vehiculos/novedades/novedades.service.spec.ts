import { Test, TestingModule } from '@nestjs/testing';
import { TIPO } from '../../types';
import { NovedadesService } from './novedades.service';

describe('novedadesService', () => {
  let service: NovedadesService;
  const id = 1;
  const nDto = {
    asunto: 'Ruido',
    descripcion: 'Probando la api',
    tipo: TIPO.MULTA,
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NovedadesService,
          useValue: {
            createNovedad: jest.fn().mockResolvedValue({ id, ...nDto }),
          },
        },
      ],
    }).compile();

    service = module.get<NovedadesService>(NovedadesService);
  });

  it('el servicio debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe poder crear una novedad', async () => {
    expect(service.createNovedad(id, nDto)).toBeDefined();
    expect(await service.createNovedad(id, nDto)).toEqual({ id, ...nDto });
  });
});
