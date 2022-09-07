import { Car } from '@modules/cars/infra/typeorm/model/Car';
import { ICarsRepository, ICreateCarDTO } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => !!car.available);

    if (brand || category_id || name) {
      return cars.filter(
        (car) =>
          (brand && car.brand === brand) ||
          (category_id && car.category_id === category_id) ||
          (name && car.name === name)
      );
    }
    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
