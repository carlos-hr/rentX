import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { RecoverPasswordEmailUseCase } from './RecoverPasswordEmailUseCase';

export class RecoverPasswordEmailController {
  async handle(req: Request, res: Response) {
    const recoverPasswordEmailUseCase = container.resolve(
      RecoverPasswordEmailUseCase
    );

    const { email } = req.body;

    await recoverPasswordEmailUseCase.execute(email);

    res.send();
  }
}
