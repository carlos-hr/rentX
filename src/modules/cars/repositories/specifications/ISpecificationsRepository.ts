import { Specification } from '../../model/Specification';

export interface ISpecificationsDTO {
  description: string;
  name: string;
}

export interface ISpecificationsRepository {
  create({ description, name }: ISpecificationsDTO): void;
  findByName(name: string): Specification;
  list(): Specification[];
}
