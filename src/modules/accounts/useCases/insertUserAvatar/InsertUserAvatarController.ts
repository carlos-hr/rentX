import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { InsertUserAvatarUseCase } from './InsertUserAvatarUseCase';

export class InsertUserAvatarController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const avatar_file = req.file.filename;

    const insertUserAvatarUseCase = container.resolve(InsertUserAvatarUseCase);

    await insertUserAvatarUseCase.execute({
      avatar_file,
      user_id: id,
    });

    return res.status(200).send();
  }
}
