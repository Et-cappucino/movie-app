import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { EmailAlreadyConfirmedException } from '../custom-exceptions';

@Catch(EmailAlreadyConfirmedException)
export class EmailAlreadyConfirmedFilter implements ExceptionFilter {
  catch(exception: EmailAlreadyConfirmedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400)
            .render(join(__dirname, '../../..', 'views', 'token-already-confirmed.hbs'));
  }
}
