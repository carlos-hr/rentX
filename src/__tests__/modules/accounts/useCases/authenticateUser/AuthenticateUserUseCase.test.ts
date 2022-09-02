import { AppError } from '../../../../../errors/AppError';
import { ICreateUserDTO } from '../../../../../modules/accounts/dtos/ICreateUser';
import { UsersRepositoryInMemory } from '../../../../../modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AuthenticateUserUseCase } from '../../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../../../../../modules/accounts/useCases/createUser/CreateUserUseCase';

describe('Authenticate user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: 'aaaaa',
      email: 'user@teste.com',
      name: 'User',
      password: 'teste123',
    };

    await createUserUseCase.execute(user);

    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('Should not be able to authenticate non-existing user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'user@email.com',
        password: 'password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: 'aaaaa',
        email: 'user2@teste.com',
        name: 'Username',
        password: 'teste123',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: 'aaaaa',
        email: 'user3@teste.com',
        name: 'Username',
        password: 'teste123',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'teste@email.com',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
