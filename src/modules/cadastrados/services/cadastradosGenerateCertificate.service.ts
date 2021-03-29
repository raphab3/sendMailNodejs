
import { Cadastrados } from './../infra/typeorm/entities/cadastrados.entity';
import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import ICadastradosRepository from "../repositories/ICadastradosRepository";
import imageToBase64 from "image-to-base64";
import { jsPDF } from "jspdf";
import fs from "fs"

interface IRequest {
  full_name: string
  email: string
}

import crypto from 'crypto';
import path from 'path';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Queue from 'bull';


@injectable()
export default class CadastradosGeneateCertificateService {

  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject("CadastradosRepository") private cadastradosRepository: ICadastradosRepository) { }

  async execute(): Promise<any> {
    console.log("")
    // const cadastrado = await this.cadastradosRepository.findByEmail(email)
    // if (!cadastrado) {
    //   throw new AppError("User not found!", 404)
    // }

    const cadastrados = await this.cadastradosRepository.find({})

    const newEmail = "xocogod224@irahada.com"


    for (let index = 0; index <= cadastrados.length; index++) {
      const cadas: any = []
      cadas[index] = { full_name: cadastrados[index].full_name, email: newEmail }

      setTimeout(() => {
        // const newP = { full_name: "RAFAEL BATISTA", email: newEmail }

        const filehash = crypto.randomBytes(10).toString('hex');
        const fileName = `${filehash}${Date.now()}.pdf`;

        const certificadoTemplate = path.resolve(
          __dirname,
          '..',
          'views',
          'certificado.hbs',
        );

        // //redis
        const options = {
          delay: 5000,
          lifo: true,
        };

        const data = {
          full_name: cadas[index].full_name,
          email: cadas[index].email,
          certificadoTemplate: certificadoTemplate,
          fileName: fileName
        };

        const sendMailQueue = new Queue('sendMail')

        sendMailQueue.add(data, options);
        sendMailQueue.process(async job => {
          let pdf: any = "";

          pdf = await this.gerarPDF(
            "files/certificado.png",
            cadas[index].full_name
          );

          pdf = await pdf.split(';base64,').pop();

          fs.writeFile(`tmp/uploads/certificados/${fileName}`, pdf, { encoding: 'base64' }, function (err) {
            if (err)
              return console.error(err);
          });


          await this.sendMail(job.data.full_name, job.data.email, job.data.certificadoTemplate, job.data.fileName)
        })

      }, 5000);


    }

    return "Enviados"
  }



  private async gerarPDF(file_url: any, nome: any) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      imageToBase64(file_url) // Path to the image
        .then((imgData) => {
          const doc = new jsPDF({
            orientation: "landscape",
          });

          doc.setFontSize(30);
          doc.addImage(imgData, "JPEG", 8, 15, 280, 180);
          const splitTitle = doc.splitTextToSize(`${nome}`, 180);
          doc.text(splitTitle, 24, 110, { align: 'left' });
          doc.autoPrint();
          let url = doc.output("dataurlstring");
          url = url.replace(/^data:image\/(png|jpg);base64,/, "");
          resolve(url);
        })
    });
  }

  private async sendMail(full_name: any, email: any, certificadoTemplate: any, fileName: any) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async () => {
      await this.mailProvider.sendMail({
        to: {
          name: full_name,
          email: email,
        },
        subject: 'Gerando Certificado',
        templateData: {
          file: certificadoTemplate,
          variables: {
            name: full_name,
            img: "https://static.wixstatic.com/media/4bac15_f5f41e82fb4d4a489e4fec78e3efc0a6~mv2.png/v1/fill/w_153,h_153,al_c,q_85,usm_0.66_1.00_0.01/brasao_icone.webp",
            link: `${process.env.APP_API_URL}/files/certificados/${fileName}`,
          },
        }
      });
    })
  }
}















