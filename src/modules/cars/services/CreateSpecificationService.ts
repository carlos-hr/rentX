import { ISpecificationsRepository } from '../repositories/specifications/ISpecificationsRepository';

interface IRequest {
  description: string;
  name: string;
}

export class CreateSpecification {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    this.specificationsRepository.create({ description, name });
  }
}
