import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { verifyAuthentication } from '@shared/infra/http/middlewares/verifyAuthentication';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { InsertUserAvatarController } from '@modules/accounts/useCases/insertUserAvatar/InsertUserAvatarController';
import { UserProfileController } from '@modules/accounts/useCases/userProfile/UserProfileController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();
const insertUserAvatarController = new InsertUserAvatarController();
const userProfileController = new UserProfileController();

const uploadAvatar = multer(uploadConfig);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  verifyAuthentication,
  uploadAvatar.single('avatar'),
  insertUserAvatarController.handle
);

usersRoutes.get('/profile', verifyAuthentication, userProfileController.handle);
