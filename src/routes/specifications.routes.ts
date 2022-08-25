import { Router } from 'express';

import { SpecifactionsRepository } from '../modules/cars/repositories/specifications/SpecificationRepository';
import { CreateSpecification } from '../modules/cars/services/CreateSpecification';

export const specificationsRoutes = Router();

const specificationsRepository = new SpecifactionsRepository();

specificationsRoutes.post('/', (req, res) => {
  const { description, name } = req.body;
  const createSpecification = new CreateSpecification(specificationsRepository);

  createSpecification.execute({ description, name });

  return res.status(201).send();
});

specificationsRoutes.get('/', (req, res) => {
  const list = specificationsRepository.list();

  return res.json(list);
});
