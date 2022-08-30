import { inject, injectable } from 'tsyringe';

import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../../repositories/specifications/ISpecificationsRepository';

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}
