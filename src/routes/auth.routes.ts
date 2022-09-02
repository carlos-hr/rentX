import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';

export const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authRoutes.post('/', authenticateUserController.handle);
