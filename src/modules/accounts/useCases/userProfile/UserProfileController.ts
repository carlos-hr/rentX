import { UserProfileUseCase } from './UserProfileUseCase';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserProfileController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const userProfileUseCase = container.resolve(UserProfileUseCase);

    const user = await userProfileUseCase.execute(id);

    return res.json(user);
  }
}
