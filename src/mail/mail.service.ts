import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async forgotPassword(email: string, url: string) {
    const image = {
      src: 'https://res.cloudinary.com/dwt5jjcjw/image/upload/fl_preserve_transparency/v1730875343/du0lowpjdc6bzd8nuzvg.jpg?_s=public-apps',
      name: 'logo',
    };
    await this.mailerService.sendMail({
      to: email, // list of receivers
      from: '', // tự nhập mail mình vô
      subject: 'Thay đổi mật khẩu của bạn', // Subject line
      template: 'forgot-password', // plaintext body
      context: {
        email: email,
        url: url,
        image: image,
      },
    });
  }
}
