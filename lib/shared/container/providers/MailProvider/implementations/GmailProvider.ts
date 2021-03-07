import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import smtpTransport from 'nodemailer/lib/smtp-transport';
@injectable()
export default class GmailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {

    let transporter = nodemailer.createTransport(new smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD_APP
      }
    }));

    this.client = transporter
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {

    const message = await this.client.sendMail({
      from: {
        name: from?.name || "",
        address: from?.email || 'raphab33@gmail.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });


  }
}
