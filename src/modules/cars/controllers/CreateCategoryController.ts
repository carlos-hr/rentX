import { Request, Response } from 'express';

import { CreateCategory } from '../services/CreateCategoryService';

export class CreateCategoryController {
  constructor(private createCategory: CreateCategory) {}

  handle(req: Request, res: Response) {
    const { description, name } = req.body;
    this.createCategory.execute({ description, name });

    return res.status(201).send();
  }
}
