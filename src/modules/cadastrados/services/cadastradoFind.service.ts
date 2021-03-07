import { injectable, inject } from "tsyringe";
import People from "../infra/typeorm/entities/cadastrados.entity";
import ICadastradosRepository from "../repositories/ICadastradosRepository";

interface IRequest {
  skip: number, take: number
}

@injectable()
export default class CadastradoFindService {
  constructor(
    @inject("CadastradosRepository") private cadastradosRepository: ICadastradosRepository) { }

  async execute({ skip, take }: IRequest): Promise<People[] | void> {
    const person = await this.cadastradosRepository.find({ skip: skip, take: take }).catch(() => console.log("Error time 01"));
    return person
  }
}
