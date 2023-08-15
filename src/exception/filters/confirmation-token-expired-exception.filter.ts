import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { ConfirmationTokenExpiredException } from '../custom-exceptions';

@Catch(ConfirmationTokenExpiredException)
export class ConfirmationTokenExpiredExceptionFilter implements ExceptionFilter {
  catch(exception: ConfirmationTokenExpiredException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400)
            .render(join(__dirname, '../../..', 'views', 'token-expired.hbs'));
  }
}