import { ICreateUsersTokens } from '@modules/accounts/dtos/ICreateUsersTokens';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { getRepository, Repository } from 'typeorm';
import { UsersTokens } from '../model/UsersTokens';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokens): Promise<UsersTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
