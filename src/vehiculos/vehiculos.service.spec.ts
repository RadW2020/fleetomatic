import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ESTADO } from '../types';
import { Vehiculo } from './vehiculo.entity';
import { VehiculosModule } from './vehiculos.module';
import { VehiculosService } from './vehiculos.service';

describe('vehiculosService', () => {
  const id = 1;
  const vDto = {
    marca: 'SEAT Leon',
    modelo: 2019,
    color: 'ROJO',
    estado: ESTADO.Activo,
    asignado: true,
  };
  const mockFecha = new Date(1466424490000);

  const mockVehiculosRepository = {
    save: jest.fn().mockResolvedValue({
      id,
      fechaingreso: mockFecha.toISOString(),
      ...vDto,
    }),
    delete: jest.fn(() => 'test delete'),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn(() => ({
        where: jest.fn(() => ({
          limit: jest.fn(() => ({
            orderBy: jest.fn(() => ({
              getOne: jest.fn().mockResolvedValue({
                id,
                ...vDto,
              }),
            })),
          })),
        })),
      })),
    })),
    paginate: jest.fn().mockReturnThis(),
  };

  let vehiculosService: VehiculosService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [VehiculosModule],
    })
      .overrideProvider(getRepositoryToken(Vehiculo))
      .useValue(mockVehiculosRepository)
      .compile();

    vehiculosService = module.get<VehiculosService>(VehiculosService);
  });

  it('debe estar definido', () => {
    expect(vehiculosService).toBeDefined();
  });

  it('debe encontrar un vehiculo', async () => {
    expect(await vehiculosService.findVehiculo(id)).toEqual({
      id: expect.any(Number),
      ...vDto,
    });
  });

  it('debe borrar un vehiculo', async () => {
    expect(await vehiculosService.deleteVehiculo(id)).toEqual('test delete');
  });

  it('debe crear un vehiculo', async () => {
    const spy = jest.spyOn(global, 'Date').mockImplementation(() => mockFecha as any);

    expect(await vehiculosService.createVehiculo(vDto)).toEqual({
      id: expect.any(Number),
      ...vDto,
    });
    spy.mockRestore();
  });
});
