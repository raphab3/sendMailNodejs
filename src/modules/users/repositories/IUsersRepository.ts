import ICreateUserDOT from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/Users";

export default interface IUsersRepository {
  create(data: ICreateUserDOT): Promise<User>
  save(user: User): Promise<User>
  find(data?: any): Promise<User[]>
  findByItem(data?: any): Promise<any>
  findByEmail(email: string): Promise<User | undefined>
  findByUsername(username: string): Promise<boolean>
  findByEmail2(email: string): Promise<boolean>
  findById(id: string): Promise<User | undefined>
}
