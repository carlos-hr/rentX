import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

export const categoriesRoutes = Router();
const category = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  const { description, name } = req.body;
  const categoryAlreadyExists = category.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: 'Category already exists!' });
  }

  category.create({ description, name });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  const list = category.list();

  return res.json(list);
});
