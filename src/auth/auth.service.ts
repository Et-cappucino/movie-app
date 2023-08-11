import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as Bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtPayload, Tokens } from './types';
import { AuthDto } from './dto/auth.dto';
import { Role } from './enum/role';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService ,
        private readonly configService: ConfigService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    async signUp(authDto: AuthDto): Promise<Tokens> {
        const user = await this.userService.create({ 
            email: authDto.email,
            password: authDto.password,
            isAdmin: authDto.isAdmin
        });
        const payload = this.getJwtPayload(user.id, user.email, user.isAdmin)
        const tokens = await this.getTokens(payload);
        
        await this.userService.updateHashedRefreshToken(user.id, tokens.refresh_token);

        await this.eventEmitter.emitAsync('user-signed-up', user.email, user.emailConfirmationToken.token);
       
        return tokens
    }

    async signIn(authDto: AuthDto): Promise<Tokens> {
        const user = await this.userService.findByEmail(authDto.email);
        
        if (!user) throw new ForbiddenException('Access Denied');

        const passwordMatches = await Bcrypt.compare(authDto.password, user.password);
        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const payload = this.getJwtPayload(user.id, user.email, user.isAdmin)
        const tokens = await this.getTokens(payload);
        
        await this.userService.updateHashedRefreshToken(user.id, tokens.refresh_token);
        
        return tokens
    }

    async logOut(userId: number) {
        await this.userService.updateHashedRefreshToken(userId, null);
    }

    async refreshTokens(userId: number, refreshToken: string): Promise<Tokens> {
        const user = await this.userService.findOne(userId);

        if (!user || !user.hashedRefreshToken) throw new ForbiddenException('Access Denied');
      
        const rtMatches = await Bcrypt.compare(refreshToken, user.hashedRefreshToken);
        if (!rtMatches) throw new ForbiddenException('Access Denied');

        const payload = this.getJwtPayload(user.id, user.email, user.isAdmin);
        const tokens = await this.getTokens(payload);

        await this.userService.updateHashedRefreshToken(user.id, tokens.refresh_token);
    
        return tokens
    }

    private async getTokens(payload: JwtPayload): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: this.configService.getOrThrow<string>('ACCESS_TOKEN_EXPIRES_IN'),
                secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET')
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: this.configService.getOrThrow<string>('REFRESH_TOKEN_EXPIRES_IN'),
                secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET')
            })
        ])

        return {
            access_token: accessToken, 
            refresh_token: refreshToken
        }
    }

    private getJwtPayload(userId: number, email: string, isAdmin: boolean) {
        const role = isAdmin ? Role.ADMIN : Role.USER

        const payload: JwtPayload = {
            sub: userId,
            email,
            role
        }
        return payload
    }
}
