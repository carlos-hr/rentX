import { injectable } from 'tsyringe';
import { IMailProvider } from '../IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        this.client = transporter;
      })
      .catch((err) => console.log(err));
  }

  async sendMail(to: string, subject: string, variables, path): Promise<void> {
    const fileContentTemplate = fs.readFileSync(path).toString('utf-8');
    const parseTemplate = handlebars.compile(fileContentTemplate);
    const HTMlTemplate = parseTemplate(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Anonymous',
      subject,
      html: HTMlTemplate,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
