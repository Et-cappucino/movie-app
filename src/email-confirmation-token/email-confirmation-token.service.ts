import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { EmailConfirmationToken } from './entities/email-confirmation-token.entity';

@Injectable()
export class EmailConfirmationTokenService {
  constructor(
    @InjectRepository(EmailConfirmationToken)
    private readonly emailConfirmationTokenRepository: Repository<EmailConfirmationToken>
  ) {}
  
  confirm(token: string) {
    return 'Email Confirmed'
  }

  @OnEvent('user-created')
  generateToken() {
    const token = this.emailConfirmationTokenRepository.create({
      token: 'random-token-uuid',
      createdAt: new Date(),
      expiresAt: new Date(this.getExpirationTime(15))
    })
    
    return this.emailConfirmationTokenRepository.save(token);
  }

  private getExpirationTime(minutes: number) {
    const currentDate = new Date();
    return currentDate.setMinutes(currentDate.getMinutes() + minutes);  
  }
}
