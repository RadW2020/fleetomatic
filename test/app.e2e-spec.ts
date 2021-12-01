import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehiculo } from '../src/vehiculos/vehiculo.entity';
import { Novedad } from '../src/vehiculos/novedades/novedad.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Vehiculo))
      .useValue({})
      .overrideProvider(getRepositoryToken(Novedad))
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hola Matic!');
  });

  afterAll(async () => {
    await app.close();
  });
});
