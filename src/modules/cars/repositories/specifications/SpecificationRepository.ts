import { Specification } from '../../model/Specification';
import {
  ISpecificationsDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

export class SpecifactionsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = [];
  private static INSTANCE: SpecifactionsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance() {
    if (!SpecifactionsRepository.INSTANCE) {
      SpecifactionsRepository.INSTANCE = new SpecifactionsRepository();
    }
    return SpecifactionsRepository.INSTANCE;
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

  list(): Specification[] {
    return this.specifications;
  }
}
