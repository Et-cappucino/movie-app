import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailSenderService } from './mail-sender.service';

@Module({
  imports: [MailerModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.getOrThrow<string>('MAIL_HOST'),
          service: configService.getOrThrow<string>('MAIL_SERVICE'),
          auth: {
            user: configService.getOrThrow<string>('MAIL_USERNAME'),
            pass: configService.getOrThrow<string>('MAIL_PASSWORD')
          }
        },
        template: {
          dir: join(__dirname, '../../views'),
          adapter: new HandlebarsAdapter()
        }
      }),
    inject: [ConfigService],
  })],
  providers: [MailSenderService]
})
export class MailSenderModule {}
