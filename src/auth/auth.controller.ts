import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { AuthDto } from './dto/auth.dto';
import { GetCurrentUserId, GetCurrentUserRefreshToken, Public } from 'src/common/decorators';
import { RefreshTokenGuard } from 'src/common/guards';

@ApiTags('Auth-Controller')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('signup')
    signUp(@Body() authDto: AuthDto): Promise<Tokens> {
        return this.authService.signUp(authDto);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() authDto: AuthDto): Promise<Tokens> {
        return this.authService.signIn(authDto);
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logOut(@GetCurrentUserId() userId: number) {
        this.authService.logOut(userId);
    }

    @ApiBearerAuth()
    @Public()
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refresh(@GetCurrentUserId() userId: number, 
            @GetCurrentUserRefreshToken() refreshToken: string): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
 