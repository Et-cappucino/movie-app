import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signUp() {
       return 'Signed Up';
    }

    signIn() {
        return 'Signed In';
    }
}
