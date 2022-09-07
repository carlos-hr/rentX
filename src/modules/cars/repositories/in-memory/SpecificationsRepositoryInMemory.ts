import { Specification } from '@modules/cars/infra/typeorm/model/Specification';
import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  specifications: Specification[] = [];

  async create({ description, name }: ISpecificationsDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((spec) => ids.includes(spec.id));
  }

  async list(): Promise<Specification[]> {
    return this.specifications;
  }
}
