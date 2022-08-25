import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/categories/CategoriesRepository';
import { createCategoryController } from '../modules/cars/useCases';

export const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  const list = categoriesRepository.list();

  return res.json(list);
});
