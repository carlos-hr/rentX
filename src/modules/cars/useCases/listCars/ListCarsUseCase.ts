import { Car } from '@modules/cars/infra/typeorm/model/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  brand?: string;
  category_id?: string;
  name?: string;
}

export class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name
    );

    return cars;
  }
}
