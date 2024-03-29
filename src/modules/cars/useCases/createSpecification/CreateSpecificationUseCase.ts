import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

interface IRequest {
  description: string;
  name: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ description, name }: IRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationsRepository.create({ description, name });
  }
}
