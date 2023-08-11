import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { EmailConfirmationToken } from './entities/email-confirmation-token.entity';

@Injectable()
export class EmailConfirmationTokenService {
  constructor(
    @InjectRepository(EmailConfirmationToken)
    private readonly emailConfirmationTokenRepository: Repository<EmailConfirmationToken>,
    private readonly configService: ConfigService
  ) {}
  
  async confirm(token: string) {
    const confirmationToken = await this.findConfirmationToken(token);
    
    await this.emailConfirmationTokenRepository.save({
      ...confirmationToken,
      confirmedAt: new Date()
    })
  }

  @OnEvent('user-created')
  generateToken() {
    const minutes = this.configService.getOrThrow<number>('EXPIRATION_MINUTES')
    const uuid = uuidv4();
    
    const token = this.emailConfirmationTokenRepository.create({
      token: uuid,
      createdAt: new Date(),
      expiresAt: new Date(this.getExpirationTime(minutes))
    })
    
    return this.emailConfirmationTokenRepository.save(token);
  }

  private getExpirationTime(minutes: number) {
    const currentDate = new Date();
    return currentDate.setMinutes(currentDate.getMinutes() + minutes);  
  }

  private async findConfirmationToken(token: string) {
    const confirmationToken = await this.emailConfirmationTokenRepository.findOne({
      where: {
        token
      }
    })

    return confirmationToken
  }
}
