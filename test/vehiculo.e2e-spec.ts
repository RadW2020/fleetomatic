import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { VehiculosModule } from '../src/vehiculos/vehiculos.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehiculo } from '../src/vehiculos/vehiculo.entity';
import { ESTADO } from '../src/types';

describe('VehiculosController (e2e)', () => {
  let app: INestApplication;
  const id = 1;
  const vDto = {
    marca: 'SEAT Leon',
    modelo: 2019,
    color: 'ROJO',
    estado: ESTADO.Activo,
    asignado: true,
  };

  const mockVehiculosRespository = {
    save: jest.fn().mockResolvedValue({ id, ...vDto }),
    delete: jest.fn().mockResolvedValue('test'),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      clone: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
    })),
    paginate: jest.fn().mockReturnThis(),
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [VehiculosModule],
    })
      .overrideProvider(getRepositoryToken(Vehiculo))
      .useValue(mockVehiculosRespository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
  it('/ (POST) vehiculo', () => {
    return request(app.getHttpServer())
      .post('/vehiculos')
      .send({ ...vDto })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id,
          ...vDto,
        });
      });
  });
  it('/ (DELETE) vehiculo', () => {
    return request(app.getHttpServer()).delete('/vehiculos/1').expect(200);
  });
  it('/ (UPDATE) vehiculo', () => {
    return request(app.getHttpServer())
      .put('/vehiculos/1')
      .send({ ...vDto })
      .expect(400);
  });
  it('/ (GET) vehiculo', () => {
    return request(app.getHttpServer()).get('/vehiculos/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
