import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
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
        }
    }),
    inject: [ConfigService],
  })],
  providers: [MailSenderService],
  exports: [MailSenderService]
})
export class MailSenderModule {}
