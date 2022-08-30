import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

export class ListSpecificationsController {
  async handle(req: Request, res: Response) {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );
    const list = await listSpecificationsUseCase.execute();

    return res.json(list);
  }
}
