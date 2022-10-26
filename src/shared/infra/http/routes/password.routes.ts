import { RecoverPasswordEmailController } from '@modules/accounts/useCases/recoverPasswordEmail/RecoverPasswordEmailController';
import { Router } from 'express';

export const passwordRoutes = Router();
const recoverPasswordEmailController = new RecoverPasswordEmailController();

passwordRoutes.post('/recover', recoverPasswordEmailController.handle);
