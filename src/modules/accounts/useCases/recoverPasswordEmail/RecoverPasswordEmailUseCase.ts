import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { addHours } from '@utils/dateCompare';
import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { resolve } from 'path';

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
    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

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

    const variables = {
      name: user.name,
      link: `${process.env.RECOVER_MAIL_URL}${token}`,
    };

    await this.etherealMailProvider.sendMail(
      email,
      'Email recovery',
      variables,
      templatePath
    );
  }
}
