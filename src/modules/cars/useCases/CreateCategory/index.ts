import { CategoriesRepository } from '../../repositories/categories/CategoriesRepository';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export const categoriesRepository = CategoriesRepository.getIstance();
export const createCategory = new CreateCategoryUseCase(categoriesRepository);
export const createCategoryController = new CreateCategoryController(
  createCategory
);
