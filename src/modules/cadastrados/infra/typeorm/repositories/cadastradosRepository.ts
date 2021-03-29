import { Cadastrados } from './../entities/cadastrados.entity';

import { getRepository, Repository } from "typeorm";
import ICreateCadastradosDTO from '@modules/cadastrados/dtos/ICreateCadastradosDTO';
import IFindCadastradosDTO from '@modules/cadastrados/dtos/IFindCadastradosDTO';
import ICadastradosRepository from '@modules/cadastrados/repositories/ICadastradosRepository';

export default class CadastradosRepository implements ICadastradosRepository {

  private ormRepository: Repository<Cadastrados>

  constructor() {
    this.ormRepository = getRepository(Cadastrados)
  }


  public async findById(id: string): Promise<void | Cadastrados> {
    const cadastrado = await this.ormRepository.findOne(id)
    return cadastrado;
  }

  public async count(): Promise<number> {
    const total = this.ormRepository.count()
    return total
  }

  public async find({ skip, take }: IFindCadastradosDTO): Promise<Cadastrados[]> {
    console.log({ skip, take })
    const Cadastrados = await this.ormRepository.find({ skip, take, order: { id: 'DESC' } })
    return Cadastrados
  }

  public async create({ full_name, email }: ICreateCadastradosDTO): Promise<Cadastrados> {
    const cadastrado = this.ormRepository.create({
      full_name, email
    })
    await this.ormRepository.save(cadastrado);
    return cadastrado;
  }

  async findByEmail(email: string): Promise<void | Cadastrados> {
    const cadastrado = await this.ormRepository.findOne({ email: email })
    return cadastrado;
  }
}


