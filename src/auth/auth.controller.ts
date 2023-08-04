import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto';
import { Tokens } from './types';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
        return this.authService.signUp(createUserDto);
    }

    @Post('signin')
    signIn() {
        return this.authService.signIn();
    }
}
 