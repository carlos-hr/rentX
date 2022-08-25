import { Router } from 'express';

import { createCategoryController } from '../modules/cars';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

export const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  const list = categoriesRepository.list();

  return res.json(list);
});
