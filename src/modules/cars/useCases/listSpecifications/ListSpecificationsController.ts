import { Request, Response } from 'express';

import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

export class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}
  handle(req: Request, res: Response) {
    const list = this.listSpecificationsUseCase.execute();

    return res.json(list);
  }
}
