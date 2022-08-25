import { Specification } from '../../model/Specification';
import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

export class SpecifactionsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  constructor() {
    this.specifications = [];
  }

  create({ description, name }: ISpecificationsDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      created_at: new Date(),
      description,
      name,
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}
