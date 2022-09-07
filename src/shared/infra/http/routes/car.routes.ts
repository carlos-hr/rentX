import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';

export const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  verifyAuthentication,
  ensureAdmin,
  createCarController.handle
);
