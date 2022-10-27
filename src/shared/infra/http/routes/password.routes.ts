import { RecoverPasswordEmailController } from '@modules/accounts/useCases/recoverPasswordEmail/RecoverPasswordEmailController';
import { ResetPasswordController } from '@modules/accounts/useCases/resetPassword/ResetPasswordController';
import { Router } from 'express';

export const passwordRoutes = Router();
const recoverPasswordEmailController = new RecoverPasswordEmailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post('/recover', recoverPasswordEmailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);
