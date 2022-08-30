import { Request, Response } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  async handle(req: Request, res: Response) {
    const { description, name } = req.body;
    await this.createCategoryUseCase.execute({ description, name });

    return res.status(201).send();
  }
}
