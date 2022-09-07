import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarsSpecificationsController =
  new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  verifyAuthentication,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/', listCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  // verifyAuthentication,
  // ensureAdmin,
  createCarsSpecificationsController.handle
);
