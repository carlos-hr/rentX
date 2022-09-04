import { getRepository, Repository } from 'typeorm';

import { Specification } from '../model/Specification';
import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ISpecificationsDTO) {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string) {
    const specification = this.repository.findOne({ name });

    return specification;
  }

  async list() {
    const list = await this.repository.find();

    return list;
  }
}
