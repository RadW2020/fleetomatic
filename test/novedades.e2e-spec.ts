import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Novedad } from '../src/vehiculos/novedades/novedad.entity';
import { NovedadesModule } from '../src/vehiculos/novedades/novedades.module';
import { TIPO } from '../src/types';

describe('NovedadesController (e2e)', () => {
  let app: INestApplication;
  const nDto = {
    asunto: 'Ruido',
    descripcion: 'Probando la api',
    tipo: TIPO.MULTA,
  };

  const mockNovedadesRespository = {
    save: jest.fn().mockReturnThis(),
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NovedadesModule],
    })
      .overrideProvider(getRepositoryToken(Novedad))
      .useValue(mockNovedadesRespository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  it('/ (POST) novedad', () => {
    return request(app.getHttpServer()).post('/vehiculos/1/novedades').send(nDto).expect(201);
  });
  afterAll(async () => {
    await app.close();
  });
});
