import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { AuthDto } from './dto/auth.dto';
import { GetCurrentUserId, GetCurrentUserRefreshToken, Public } from 'src/common/decorators';
import { RefreshTokenGuard } from 'src/common/guards';

@ApiTags('Auth-Controller')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiCreatedResponse({ description: 'Sign-Up successfully done.' })
    @ApiConflictResponse({ description: 'User with provided email already exists.' })
    @Public()
    @Post('signup')
    signUp(@Body() authDto: AuthDto): Promise<Tokens> {
        return this.authService.signUp(authDto);
    }
    
    @ApiOkResponse({ description: 'Sign-In successfully done.' })
    @ApiNotFoundResponse({ description: 'User with provided email could not be found.' })
    @ApiForbiddenResponse({ description: 'Access denied because of wrong credentials.' })
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() authDto: AuthDto): Promise<Tokens> {
        return this.authService.signIn(authDto);
    }

    @ApiOkResponse({ description: 'Log-Out successfully done.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized to log out.' })
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logOut(@GetCurrentUserId() userId: number) {
        this.authService.logOut(userId);
    }

    @ApiOkResponse({ description: 'Tokens have been successfully refreshed.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized to refresh the tokens.' })
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
 