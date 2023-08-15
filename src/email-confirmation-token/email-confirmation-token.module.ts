import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailConfirmationTokenService } from './email-confirmation-token.service';
import { EmailConfirmationTokenController } from './email-confirmation-token.controller';
import { EmailConfirmationToken } from './entities/email-confirmation-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailConfirmationToken])],
  controllers: [EmailConfirmationTokenController],
  providers: [EmailConfirmationTokenService]
})
export class EmailConfirmationTokenModule {}
