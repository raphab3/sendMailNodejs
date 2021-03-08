import { Request, Response } from 'express';
import { container } from 'tsyringe';

import neatCsv from "neat-csv"
import fs from "fs"
import path from 'path';
import CadastradosCreateService from '@modules/cadastrados/services/cadastradoCreate.service';
import CadastradoFindService from '@modules/cadastrados/services/cadastradoFind.service';
import CadastradosFindByIdService from '@modules/cadastrados/services/cadastradosFindById.service';
import CadastradosGeneateCertificateService from '@modules/cadastrados/services/cadastradosGenerateCertificate.service';



export default class CadastradosController {


  public async csv(request: Request, response: Response): Promise<Response> {
    const preRegisteredService = container.resolve(CadastradosCreateService)
    const tmpFolderCsv = path.resolve(__dirname, '..', '..', '..', '..', '..', '..', '..', 'tmp/csv/participantes.csv');

    fs.readFile(tmpFolderCsv, async (erro, file) => {
      console.log(file)
      const data = (await neatCsv(file))
      data.forEach(async (linha: any) => {
        const participante = { full_name: "", email: "" }
        participante.full_name = linha.Nome.toLocaleUpperCase()
        participante.email = linha.Email.toLocaleLowerCase()
        await preRegisteredService.execute({ full_name: participante.full_name, email: participante.email })
      })
    })

    return response.status(200).json({ data: "Import success!" })
  }

  public async certificado(request: Request, response: Response): Promise<Response> {
    const cadastradosService = container.resolve(CadastradosGeneateCertificateService)
    const email: any = request.query.email
    const full_name: any = request.query.full_name
    const participante = await cadastradosService.execute({ full_name, email })
    return response.status(200).json({
      msg: "Certificado Gerado",
      data: participante
    })
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const cadastradosService = container.resolve(CadastradoFindService)
    // Paginação skip => numero da página, take => quantos por página
    let { skip, take }: any = request.query
    skip = parseInt(skip)
    take = parseInt(take)
    const cadastrados: any = await cadastradosService.execute({ skip, take })
    const total = cadastrados.length

    return response.status(200).json({ data: cadastrados, page: skip, limit: take, total: total })
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const cadastradosService = container.resolve(CadastradosFindByIdService)
    const people = await cadastradosService.execute({ id }).catch(() => {
      console.log("Error: People not found!");
    });
    return response.status(200).json({
      data: people
    })
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { full_name, email } = request.body
    console.log({ full_name, email })
    const createCadastrado = container.resolve(CadastradosCreateService)
    const cadastrado = await createCadastrado.execute({
      full_name, email
    })
    return response.status(200).json({ data: cadastrado })
  }

}

