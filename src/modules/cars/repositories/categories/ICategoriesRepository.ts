import { Category } from '../../model/Category';

export interface ICreateCategoryDTO {
  description: string;
  name: string;
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
}
