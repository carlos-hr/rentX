import { AppError } from '@errors/AppError';
import { Rental } from '@modules/rentals/infra/typeorm/model/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import dayjs from 'dayjs';
import { SimpleConsoleLogger } from 'typeorm';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}
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

    const compareDate = dayjs(expected_return_date).diff(new Date(), 'hours');

    if (compareDate < 24) {
      throw new AppError('The rental must have a minimum duration of 24 hours');
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    return rental;
  }
}
