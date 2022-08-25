import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response) {
    const { description, name } = req.body;
    this.createCategoryUseCase.execute({ description, name });

    return res.status(201).send();
  }
}
