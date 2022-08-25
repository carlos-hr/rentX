import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IRequest {
  description: string;
  name: string;
}

export class CreateCategory {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already exists!');
    }

    this.categoriesRepository.create({ description, name });
  }
}
