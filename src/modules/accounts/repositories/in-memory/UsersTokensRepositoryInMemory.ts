import { ICreateUsersTokens } from '@modules/accounts/dtos/ICreateUsersTokens';
import { UsersTokens } from '@modules/accounts/infra/typeorm/model/UsersTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UsersTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokens): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByCredentials(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (userTk) =>
        user_id === userTk.user_id && refresh_token === userTk.refresh_token
    );

    return userToken;
  }

  async deleteToken(id: string): Promise<void> {
    const userToken = this.usersTokens.find((userTk) => userTk.id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(token: string): Promise<UsersTokens> {
    const userToken = this.usersTokens.find(
      (userTk) => userTk.refresh_token === token
    );

    return userToken;
  }
}
