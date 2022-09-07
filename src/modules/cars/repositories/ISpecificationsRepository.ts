import { Specification } from '../infra/typeorm/model/Specification';

export interface ISpecificationsDTO {
  description: string;
  name: string;
}

export interface ISpecificationsRepository {
  create({ description, name }: ISpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  list(): Promise<Specification[]>;
}
