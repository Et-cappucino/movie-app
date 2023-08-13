import { Controller, Get, Query, Render, UseFilters } from '@nestjs/common';
import { EmailConfirmationTokenService } from './email-confirmation-token.service';
import { Public } from 'src/common/decorators';
import { ConfirmationTokenExpiredExceptionFilter, EmailAlreadyConfirmedFilter } from 'src/exception/filters';

@Controller('confirm')
@UseFilters(EmailAlreadyConfirmedFilter, ConfirmationTokenExpiredExceptionFilter)
export class EmailConfirmationTokenController {
  constructor(private readonly emailConfirmationTokenService: EmailConfirmationTokenService) {}

  @Public()
  @Render('email-confirmed.hbs')
  @Get()
  async confirm(@Query('token') token: string) {
    await this.emailConfirmationTokenService.confirm(token);
  }
}
