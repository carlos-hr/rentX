import { AppError } from '@errors/AppError';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { RecoverPasswordEmailUseCase } from '@modules/accounts/useCases/recoverPasswordEmail/RecoverPasswordEmailUseCase';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

let recoverPasswordEmailUseCase: RecoverPasswordEmailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe('Send recover password mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();
    recoverPasswordEmailUseCase = new RecoverPasswordEmailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      mailProviderInMemory
    );
  });

  it('should be able to send a recover password mail to user', async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: 'abc123',
      email: 'random@email.com',
      name: 'Random',
      password: '123456',
    });

    await recoverPasswordEmailUseCase.execute('random@email.com');

    expect(sendMail).toBeCalled();
  });

  it('should not send email to an non-existing user', async () => {
    await expect(
      recoverPasswordEmailUseCase.execute('aa@gmail.com')
    ).rejects.toEqual(new AppError('User not found.'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create'
    );

    await usersRepositoryInMemory.create({
      driver_license: 'abc123',
      email: 'random@email.com',
      name: 'Random',
      password: '123456',
    });

    await recoverPasswordEmailUseCase.execute('random@email.com');

    expect(generateTokenMail).toBeCalled();
  });
});
