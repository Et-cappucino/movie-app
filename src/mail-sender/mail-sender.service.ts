import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { MailOptions } from './types/mail-options.type';

@Injectable()
export class MailSenderService {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailSenderService: MailerService
    ) {}
    
    @OnEvent('user-signed-up')
    async sendConfirmationMail(email: string) {
        const options: MailOptions = {
            to: email,
            subject: 'Confirm your email to activate your profile!',
            from: this.configService.getOrThrow<string>('MAIL_USERNAME'),
            template: 'confirmation-email',
            context: { 
                link:'random_link_for_confirmation' 
            }
        }
        await this.mailSenderService.sendMail(options);
    }
}
