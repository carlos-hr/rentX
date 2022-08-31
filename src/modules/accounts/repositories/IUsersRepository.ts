import { ICreateUserDTO } from '../dtos/ICreateUser';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
}
