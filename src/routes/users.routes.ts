import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { verifyAuthentication } from '../middlewares/verifyAuthentication';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { InsertUserAvatarController } from '@modules/accounts/useCases/insertUserAvatar/InsertUserAvatarController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();
const insertUserAvatarController = new InsertUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  verifyAuthentication,
  uploadAvatar.single('avatar'),
  insertUserAvatarController.handle
);
