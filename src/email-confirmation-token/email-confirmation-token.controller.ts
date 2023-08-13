import { Controller, Get, Query, Render } from '@nestjs/common';
import { EmailConfirmationTokenService } from './email-confirmation-token.service';
import { Public } from 'src/common/decorators';

@Controller('confirm')
export class EmailConfirmationTokenController {
  constructor(private readonly emailConfirmationTokenService: EmailConfirmationTokenService) {}

  @Public()
  @Render('email-confirmed.hbs')
  @Get()
  confirm(@Query('token') token: string) {
    this.emailConfirmationTokenService.confirm(token);
  }
}
