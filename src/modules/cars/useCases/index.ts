import { CategoriesRepository } from '../repositories/categories/CategoriesRepository';
import { CreateCategoryController } from './CreateCategory/CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategory/CreateCategoryUseCase';

export const categoriesRepository = new CategoriesRepository();
export const createCategory = new CreateCategoryUseCase(categoriesRepository);
export const createCategoryController = new CreateCategoryController(
  createCategory
);
