import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload, Tokens } from './types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService ,
        private readonly configService: ConfigService
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<Tokens> {
        const user = await this.userService.create(createUserDto);
        const payload = this.getJwtPayload(user.id, user.email)
        const tokens = await this.getTokens(payload);
        
        return tokens
    }

    signIn() {
        return 'Signed In';
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

    private getJwtPayload(userId: number, email: string) {
        const payload: JwtPayload = {
            sub: userId,
            email
        }
        return payload
    }
}
