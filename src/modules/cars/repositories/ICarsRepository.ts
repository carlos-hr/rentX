import { Car } from '../infra/typeorm/model/Car';
import { Specification } from '../infra/typeorm/model/Specification';

export interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  updateAvailability(id: string, available: boolean): Promise<void>;
}
