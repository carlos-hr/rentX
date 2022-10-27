import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

export class ResetPasswordController {
  async handle(req: Request, res: Response) {
    const { token } = req.query;
    const { password } = req.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
    await resetPasswordUseCase.execute({ token: String(token), password });

    return res.status(200).send();
  }
}
