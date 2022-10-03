import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CloseRentalUseCase } from './CloseRentalUseCase';

export class CloseRentalController {
  async handle(req: Request, res: Response) {
    const closeRentalUseCase = container.resolve(CloseRentalUseCase);
    const { id } = req.params;

    const rental = await closeRentalUseCase.execute(id);

    return res.status(200).json(rental);
  }
}
