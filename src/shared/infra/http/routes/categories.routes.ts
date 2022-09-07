import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import uploadConfig from '@config/upload';

export const categoriesRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/categories'));

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  verifyAuthentication,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  verifyAuthentication,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
);
