import { Controller, Get, Query } from '@nestjs/common';
import { EmailConfirmationTokenService } from './email-confirmation-token.service';
import { Public } from 'src/common/decorators';

@Controller('confirm')
export class EmailConfirmationTokenController {
  constructor(private readonly emailConfirmationTokenService: EmailConfirmationTokenService) {}

  @Public()
  @Get()
  confirm(@Query('token') token: string) {
    this.emailConfirmationTokenService.confirm(token);
  }
}
