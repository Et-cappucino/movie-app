import { Module } from '@nestjs/common';
import { EmailConfirmationTokenService } from './email-confirmation-token.service';
import { EmailConfirmationTokenController } from './email-confirmation-token.controller';

@Module({
  imports: [],
  controllers: [EmailConfirmationTokenController],
  providers: [EmailConfirmationTokenService]
})
export class EmailConfirmationTokenModule {}
