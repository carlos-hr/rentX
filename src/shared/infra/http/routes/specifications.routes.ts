import { Router } from 'express';

import { verifyAuthentication } from '@shared/infra/http/middlewares/verifyAuthentication';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  '/',
  verifyAuthentication,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get('/', listSpecificationsController.handle);
