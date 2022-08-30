import { CategoriesRepository } from '../../repositories/categories/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export default () => {
  const categoriesRepository = new CategoriesRepository();
  const createCategory = new CreateCategoryUseCase(categoriesRepository);
  const createCategoryController = new CreateCategoryController(createCategory);

  return createCategoryController;
};
