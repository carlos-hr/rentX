import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

@injectable()
export class UserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);
    const { email, name, id: userId, avatar, driver_license, avatarUrl } = user;

    const userResponse = instanceToInstance({
      email,
      name,
      id: userId,
      avatar,
      driver_license,
      avatarUrl,
    });

    return userResponse;
  }
}
