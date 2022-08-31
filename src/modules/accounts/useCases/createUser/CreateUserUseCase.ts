import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO) {
    const { name, username, email, password, driver_license } = data;

    await this.usersRepository.create({
      driver_license,
      email,
      name,
      password,
      username,
    });
  }
}
