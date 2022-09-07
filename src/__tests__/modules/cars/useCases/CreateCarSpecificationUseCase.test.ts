import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { CreateCarSpecificationUseCase } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create car Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('Should not be able to add a new specification on a non-existent car', async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: 'car_id',
        specifications_id: ['specifications_id_1', 'specifications_id_2'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to add a new specification into a car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'brand',
      category_id: 'category_id',
      daily_rate: 70,
      description: 'description',
      fine_amount: 1000,
      license_plate: 'testee_license',
      name: 'name',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'teste',
      name: 'teste',
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    console.log(car);
  });
});
