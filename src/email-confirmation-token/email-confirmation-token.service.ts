import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailConfirmationTokenService {
  
  confirm(token: string) {
    return 'Email Confirmed'
  }
}
