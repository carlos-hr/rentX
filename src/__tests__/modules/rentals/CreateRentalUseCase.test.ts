import { AppError } from '@errors/AppError';
import { RentasRepositoryInMemory } from '@modules/rentals/repositories/inMemory/RentasRepositoryInMemory';
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase';
import dayjs from 'dayjs';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentasRepositoryInMemory;

const validDate = dayjs().add(1, 'day').add(1, 'hour').toDate();

describe('Create rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentasRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('Should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: 'nanan',
      expected_return_date: validDate,
      user_id: 'bababa',
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to have more than one open rental per user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: validDate,
        user_id: 'bababa',
      });

      await createRentalUseCase.execute({
        car_id: 'test2',
        expected_return_date: validDate,
        user_id: 'bababa',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to have more than one open rental per car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: validDate,
        user_id: 'nanana',
      });

      await createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: validDate,
        user_id: 'bababa',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create rentals with less than 24 hours duration', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: 'test',
        expected_return_date: dayjs().toDate(),
        user_id: 'nanana',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
