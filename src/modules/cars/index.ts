import { CreateCategoryController } from './controllers/CreateCategoryController';
import { CategoriesRepository } from './repositories/categories/CategoriesRepository';
import { CreateCategory } from './services/CreateCategoryService';

export const categoriesRepository = new CategoriesRepository();
export const createCategory = new CreateCategory(categoriesRepository);
export const createCategoryController = new CreateCategoryController(
  createCategory
);
