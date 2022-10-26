import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { addHours } from '@utils/dateCompare';
import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

@injectable()
export class RecoverPasswordEmailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('EtherealMailProvider')
    private etherealMailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found.');
    }

    const token = v4();
    const expires_date = addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    await this.etherealMailProvider.sendMail(
      email,
      'Recover password',
      `Click in the link to recover your password ${token}`
    );
  }
}
