import { Cadastrados } from './../infra/typeorm/entities/cadastrados.entity';
import IFindCadastradoDTO from "../dtos/IFindCadastradosDTO";
export default interface ICadastradosRepository {

  count(): Promise<number>
  find(data?: IFindCadastradoDTO): Promise<Cadastrados[]>
  create(data: IFindCadastradoDTO): Promise<Cadastrados>
  findById(id: string): Promise<Cadastrados | void>
  findByEmail(email: string): Promise<Cadastrados | void>

}
