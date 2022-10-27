import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { dateNow, verifyExpirationDate } from '@utils/dateCompare';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError('Invalid token');
    }

    const isExpiredToken = verifyExpirationDate(
      userToken.expires_date,
      dateNow
    );

    if (isExpiredToken) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    user.password = await hash(password, 8);

    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteToken(userToken.id);
  }
}
