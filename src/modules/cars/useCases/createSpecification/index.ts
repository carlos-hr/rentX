import { SpecifactionsRepository } from '../../repositories/specifications/SpecificationRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationsRepository = SpecifactionsRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);
export const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);
