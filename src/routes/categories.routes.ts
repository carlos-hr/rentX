import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategory } from '../services/CreateCategory';

export const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  const { description, name } = req.body;
  const createCategory = new CreateCategory(categoriesRepository);
  createCategory.execute({ description, name });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  const list = categoriesRepository.list();

  return res.json(list);
});
