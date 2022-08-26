import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../../repositories/specifications/ISpecificationsRepository';

export class ListSpecificationsUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}
