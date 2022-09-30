import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/model/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { dateCompare } from '@utils/dateCompare';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    car_id,
    expected_return_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const carRented = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );

    if (carRented) {
      throw new AppError('Car is unavailable');
    }

    const userRental = await this.rentalsRepository.findOpenRentalByUserId(
      user_id
    );

    if (userRental) {
      throw new AppError('User already has an open rental');
    }

    const rentTime = dateCompare(expected_return_date);

    if (rentTime < 24) {
      throw new AppError('The rental must have a minimum duration of 24 hours');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.carsRepository.updateAvailability(car_id, false);
    return rental;
  }
}
