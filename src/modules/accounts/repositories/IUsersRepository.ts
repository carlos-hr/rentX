import { ICreateUserDTO } from '../dtos/ICreateUser';
import { User } from '../model/User';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
