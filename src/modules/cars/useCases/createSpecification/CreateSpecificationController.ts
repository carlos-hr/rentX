import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response) {
    const { description, name } = req.body;

    this.createSpecificationUseCase.execute({ description, name });

    return res.status(201).send();
  }
}
