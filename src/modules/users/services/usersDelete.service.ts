import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getRepository } from "typeorm";
import User from "../infra/typeorm/entities/Users";
import IUsersRepository from "../repositories/IUsersRepository";

interface Request {
  id: string,
}

@injectable()
export default class DeleteUserService {


  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ id }: Request): Promise<void> {
    const userRepository = getRepository(User);

    const chekUserExists = await this.usersRepository.find({
      where: { id }
    })

    if (!chekUserExists) {
      throw new AppError("User not fund");
    }

    userRepository.delete({ id })
  }
}

