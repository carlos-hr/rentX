import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, username, email, password, driver_license } = req.body;
    const data = { name, username, email, password, driver_license };

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute(data);
    return res.status(201).send();
  }
}
