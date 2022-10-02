import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { compareInDays, dateNow } from '@utils/dateCompare';
import { inject } from 'tsyringe';

interface IRequest {
  id: string;
  user_id: string;
}

export class CloseRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, user_id }: IRequest) {
    const rental = await this.rentalsRepository.findRentalById(id);
    const car = await this.carsRepository.findById(id);

    const minimumDaily = 1;
    let total = 0;
    let daily = compareInDays(rental.start_date, dateNow);

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = compareInDays(dateNow, rental.expected_return_date);

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailability(car.id, true);
  }
}
