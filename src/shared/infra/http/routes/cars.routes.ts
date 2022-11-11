import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListCarsController } from '@modules/cars/useCases/listCars/ListCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';
import uploadConfig from '@config/upload';

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const createCarsSpecificationsController =
  new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadImages = multer(uploadConfig);

carsRoutes.post(
  '/',
  verifyAuthentication,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/', listCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  verifyAuthentication,
  ensureAdmin,
  createCarsSpecificationsController.handle
);

carsRoutes.post(
  '/images/:car_id',
  verifyAuthentication,
  ensureAdmin,
  uploadImages.array('images'),
  uploadCarImagesController.handle
);
