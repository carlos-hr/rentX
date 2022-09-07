import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from '@modules/cars/useCases/listCars/ListCarsUseCase';

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Carro 1',
      brand: 'Test brand',
      description: 'teste description',
      license_plate: 'license_teste',
      daily_rate: 100,
      fine_amount: 70,
      category_id: 'category_id',
    });
    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Carro 1',
      brand: 'Test brand',
      description: 'teste description',
      license_plate: 'license_teste',
      daily_rate: 100,
      fine_amount: 70,
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      name: 'Carro 1',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Carro 1',
      brand: 'Test brand',
      description: 'teste description',
      license_plate: 'license_teste',
      daily_rate: 100,
      fine_amount: 70,
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Test brand',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Carro 1',
      brand: 'Test brand',
      description: 'teste description',
      license_plate: 'license_teste',
      daily_rate: 100,
      fine_amount: 70,
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
