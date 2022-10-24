import { ICreateUsersTokens } from '../dtos/ICreateUsersTokens';
import { UsersTokens } from '../infra/typeorm/model/UsersTokens';

export interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokens): Promise<UsersTokens>;
  findByCredentials(
    user_id: string,
    refresh_token: string
  ): Promise<UsersTokens>;
  deleteToken(id: string): Promise<void>;
}
