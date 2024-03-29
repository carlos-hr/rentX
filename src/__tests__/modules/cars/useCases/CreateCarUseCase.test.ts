import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from '@modules/cars/useCases/createCar/CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'brand',
      category_id: 'category_id',
      daily_rate: 70,
      description: 'description',
      fine_amount: 1000,
      license_plate: 'testee_license',
      name: 'name',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with repeated license plate', async () => {
    await createCarUseCase.execute({
      brand: 'brand',
      category_id: 'category_id',
      daily_rate: 70,
      description: 'description',
      fine_amount: 1000,
      license_plate: 'license_plate',
      name: 'name',
    });

    expect(
      createCarUseCase.execute({
        brand: 'brand',
        category_id: 'category_id',
        daily_rate: 70,
        description: 'description',
        fine_amount: 1000,
        license_plate: 'license_plate',
        name: 'name2',
      })
    ).rejects.toEqual(new AppError('Car already exists'));
  });

  it('Should be able to create a car available by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'brand',
      category_id: 'category_id',
      daily_rate: 70,
      description: 'description',
      fine_amount: 1000,
      license_plate: 'teste_plate',
      name: 'name teste',
    });

    expect(car.available).toBe(true);
  });
});
