import { inject, injectable } from 'tsyringe';

import { Specification } from '../../infra/typeorm/model/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const list = await this.specificationsRepository.list();
    return list;
  }
}
