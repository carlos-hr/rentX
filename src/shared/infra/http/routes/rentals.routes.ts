import { CloseRentalController } from '@modules/rentals/useCases/closeRental/CloseRentalController';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';

export const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const closeRentalController = new CloseRentalController();

rentalsRoutes.post('/', verifyAuthentication, createRentalController.handle);

rentalsRoutes.post(
  '/devolution/:id',
  verifyAuthentication,
  closeRentalController.handle
);
