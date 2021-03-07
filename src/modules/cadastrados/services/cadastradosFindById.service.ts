import { Cadastrados } from './../infra/typeorm/entities/cadastrados.entity';
import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import ICadastradosRepository from "../repositories/ICadastradosRepository";

interface IRequest {
  id: string
}

@injectable()
export default class CadastradosFindByIdService {

  constructor(
    @inject("CadastradosRepository") private cadastradosRepository: ICadastradosRepository) { }

  async execute({ id }: IRequest): Promise<Cadastrados | void> {
    const cadastrado = await this.cadastradosRepository.findById(id)
    if (!cadastrado) {
      throw new AppError("User not found!", 404)
    }
    return cadastrado
  }
}

