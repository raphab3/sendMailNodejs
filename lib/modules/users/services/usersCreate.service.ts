import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { injectable, inject } from "tsyringe";
import User from "../infra/typeorm/entities/Users";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  username: string,
  email: string,
  password: string
}

@injectable()
export default class CreateUserService {


  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) { }


  async execute({ username, email, password }: IRequest): Promise<User> {

    console.log("USER SERVICE => ", { username, email, password })


    const chekUserExistsUsername = await this.usersRepository.findByUsername(username)

    const chekUserExistsEmail = await this.usersRepository.findByEmail2(email)


    console.log("CHECK USER chekUserExistsUsername => ", chekUserExistsUsername)

    console.log("CHECK USER chekUserExistsEmail => ", chekUserExistsEmail)


    if (chekUserExistsEmail || chekUserExistsUsername) {
      throw new AppError("Email address or username already used.");
    }



    const user = await this.usersRepository.create({ username, email, password: await hash(password, 8) })

    console.log("user ok => ", user)

    return user
  }
}

