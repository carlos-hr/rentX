import { inject, injectable } from 'tsyringe';

import { ISpecificationsRepository } from '../../repositories/specifications/ISpecificationsRepository';

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
      throw new Error('Specification already exists!');
    }

    await this.specificationsRepository.create({ description, name });
  }
}
