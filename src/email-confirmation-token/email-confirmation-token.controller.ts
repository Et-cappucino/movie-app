import { Controller, Get, Query } from '@nestjs/common';
import { EmailConfirmationTokenService } from './email-confirmation-token.service';

@Controller('confirm')
export class EmailConfirmationTokenController {
  constructor(private readonly emailConfirmationTokenService: EmailConfirmationTokenService) {}

  @Get()
  confirm(@Query('token') token: string) {
    this.emailConfirmationTokenService.confirm(token);
  }
}
