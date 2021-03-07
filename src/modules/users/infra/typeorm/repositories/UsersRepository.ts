import ICreateUserDOT from "@modules/users/dtos/ICreateUserDTO";
import IFindUserDTO from "@modules/users/dtos/IFindUserDTO";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { Repository, getRepository } from "typeorm";
import User from "../entities/Users";


export default class UsersRepository implements IUsersRepository {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async find({ skip, take }: IFindUserDTO): Promise<User[]> {
    const user = await this.ormRepository.find({ skip, take })
    return user
  }

  public async create(userData: ICreateUserDOT): Promise<User> {
    const user = this.ormRepository.create(userData)

    console.log("CREATE => ", user)
    await this.ormRepository.save(user);

    console.log("SAVE => ", user)

    return user;
  }

  async save(user: User): Promise<User> {
    const newUser = await this.ormRepository.save(user)
    return newUser
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id)
    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    console.log("EMAIL => ", email)
    const user = await this.ormRepository.findOne({ email: email })

    console.log("USER 01 => ", user)

    return user
  }

  public async findByItem(data: string): Promise<User | undefined> {
    console.log("DATA => ", data)
    const user = await this.ormRepository.findOne({ username: data })
    console.log("USER 01 data => ", user)
    return user
  }


  async findByEmail2(email: string): Promise<boolean> {
    const user = await this.ormRepository.findOne({ email: email })
    return user ? true : false
  }

  async findByUsername(username: string): Promise<boolean> {
    const user = await this.ormRepository.findOne({ username: username })
    return user ? true : false
  }


}
