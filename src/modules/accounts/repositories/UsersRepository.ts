import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../dtos/ICreateUser';
import { User } from '../model/User';
import { IUsersRepository } from './IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const { name, email, password, driver_license } = data;

    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    return user;
  }
}