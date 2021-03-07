import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import User from "../infra/typeorm/entities/Users";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  skip: number, take: number
}

@injectable()
export default class UserFindService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) { }

  async execute({ skip, take }: IRequest): Promise<User[] | undefined> {
    const user = await this.usersRepository.find({ skip, take })
    if (!user) {
      throw new AppError("User not found!", 404)
    }
    return user
  }
}

