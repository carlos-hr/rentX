import { UserProfileUseCase } from './UserProfileUseCase';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class UserProfileController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const userProfileUseCase = container.resolve(UserProfileUseCase);

    const user = await userProfileUseCase.execute(id);
    const { email, name, id: userId, avatar, driver_license } = user;

    return res.json({
      email,
      name,
      id: userId,
      avatar,
      driver_license,
    });
  }
}
