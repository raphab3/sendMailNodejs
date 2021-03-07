import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import User from "../infra/typeorm/entities/Users";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  id: string
}

@injectable()
export default class UserFindByIdService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) { }

  async execute({ id }: IRequest): Promise<User | void> {
    const user = await this.usersRepository.findById(id)
    if (!user) {
      throw new AppError("User not found!", 404)
    }
    return user
  }
}

