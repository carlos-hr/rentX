import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';

export const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post('/', verifyAuthentication, createRentalController.handle);
