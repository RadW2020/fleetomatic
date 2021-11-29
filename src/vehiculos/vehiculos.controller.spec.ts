import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ESTADO } from '../types';
import { VehiculosController } from './vehiculos.controller';
import { VehiculosService } from './vehiculos.service';

const id = 1;
const vDto = {
  marca: 'SEAT Leon',
  modelo: 2019,
  color: 'ROJO',
  estado: ESTADO.Activo,
  asignado: true,
};

describe('VehiculosController', () => {
  let vehiculosController: VehiculosController;
  const mockVehiculoService = {
    createVehiculo: jest.fn((dto) => {
      return { id: Date.now(), ...dto };
    }),
    deleteVehiculo: jest.fn((dto) => {
      return { id: Date.now(), ...dto };
    }),
    updateVehiculo: jest.fn((dto) => {
      return { id, ...dto };
    }),
    findVehiculo: jest.fn((dto) => {
      return { id, ...dto };
    }),
    findAll: jest.fn(() => {
      return [{ id: Date.now(), ...vDto }];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [VehiculosController],
      providers: [VehiculosService],
    })
      .overrideProvider(VehiculosService)
      .useValue(mockVehiculoService)
      .compile();

    vehiculosController = module.get<VehiculosController>(VehiculosController);
  });

  describe('vehiculo', () => {
    it('debe estar definido', async () => {
      expect(vehiculosController).toBeDefined();
    });
    it('debe crear un vehiculo', async () => {
      expect(vehiculosController.createVehiculo(vDto)).toEqual({
        id: expect.any(Number),
        ...vDto,
      });
      expect(mockVehiculoService.createVehiculo).toHaveBeenCalledWith(vDto);
    });

    it('debe borrar un vehiculo', async () => {
      const id = 1;
      expect(await vehiculosController.deleteVehiculo(id)).toEqual({
        id: expect.any(Number),
      });
      expect(mockVehiculoService.deleteVehiculo).toHaveBeenCalledWith(id);
    });

    it('debe encontrar un vehiculo', async () => {
      expect(await vehiculosController.findVehiculo(id)).toEqual({
        id: expect.any(Number),
      });
      expect(mockVehiculoService.findVehiculo).toHaveBeenCalledWith(id);
    });

    it('debe encontrar una lista de vehiculos', async () => {
      expect(await vehiculosController.findAll()).toEqual([
        {
          id: expect.any(Number),
          ...vDto,
        },
      ]);
      expect(mockVehiculoService.findAll).toHaveBeenCalled();
    });
  });
});
