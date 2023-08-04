import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { AuthDto } from './dto/auth.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    signUp(@Body() authDto: AuthDto): Promise<Tokens> {
        return this.authService.signUp(authDto);
    }

    @Post('signin')
    signIn(@Body() authDto: AuthDto): Promise<Tokens> {
        return this.authService.signIn(authDto);
    }
}
 