import { Cadastrados } from '../infra/typeorm/entities/cadastrados.entity';
import { inject, injectable } from "tsyringe";
import ICadastradosRepository from '../repositories/ICadastradosRepository';

interface IRequest {
  full_name: string,
  email: string
}

@injectable()
export default class CadastradosCreateService {

  constructor(
    @inject("CadastradosRepository") private cadastradosRepository: ICadastradosRepository
  ) { }

  async execute({ full_name, email }: IRequest): Promise<Cadastrados> {
    console.log("cadastrado - ", { full_name, email })


    const cadastrado = await this.cadastradosRepository.create({
      full_name, email
    });

    return cadastrado
  }
}
