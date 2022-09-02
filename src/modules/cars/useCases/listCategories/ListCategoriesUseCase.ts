import { inject, injectable } from 'tsyringe';

import { Category } from '../../model/Category';
import { ICategoriesRepository } from '@modules/cars/repositories/categories/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
