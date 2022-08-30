import { container } from 'tsyringe';

import { CategoriesRepository } from '../../modules/cars/repositories/categories/CategoriesRepository';
import { ICategoriesRepository } from '../../modules/cars/repositories/categories/ICategoriesRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/specifications/ISpecificationsRepository';
import { SpecifactionsRepository } from '../../modules/cars/repositories/specifications/SpecificationRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecifactionsRepository',
  SpecifactionsRepository
);
