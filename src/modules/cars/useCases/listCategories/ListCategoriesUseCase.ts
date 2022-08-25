import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/categories/ICategoriesRepository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}
