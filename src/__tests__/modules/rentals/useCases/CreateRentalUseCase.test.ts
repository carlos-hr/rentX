import { AppError } from '@errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
import dayjs from 'dayjs';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const validDate = dayjs().add(1, 'day').add(1, 'hour').toDate();

describe('Create rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car teste',
      brand: 'Brand',
      description: 'YYYY',
      daily_rate: 100,
      fine_amount: 70,
      license_plate: 'license_2',
      category_id: 'category_id',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      expected_return_date: validDate,
      user_id: 'bababa',
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to have more than one open rental per user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: validDate,
      user_id: 'bababa',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'test2',
        expected_return_date: validDate,
        user_id: 'bababa',
      })
    ).rejects.toEqual(new AppError('User already has an open rental'));
  });

  it('Should not be able to have more than one open rental per car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: validDate,
      user_id: 'nanana',
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: validDate,
        user_id: 'bababa',
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('Should not be able to create rentals with less than 24 hours duration', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: dayjs().toDate(),
        user_id: 'nanana',
      })
    ).rejects.toEqual(
      new AppError('The rental must have a minimum duration of 24 hours')
    );
  });
});
