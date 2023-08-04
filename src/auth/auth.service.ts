import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as Bcrypt from 'bcrypt';
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

    async signIn(createUserDto: CreateUserDto): Promise<Tokens> {
        const user = await this.userService.findByEmail(createUserDto.email);
        
        if (!user) throw new ForbiddenException('Access Denied');

        const passwordMatches = await Bcrypt.compare(createUserDto.password, user.password);
        if (!passwordMatches) throw new ForbiddenException('Access Denied');

        const payload = this.getJwtPayload(user.id, user.email)
        const tokens = await this.getTokens(payload);
        
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

    private getJwtPayload(userId: number, email: string) {
        const payload: JwtPayload = {
            sub: userId,
            email
        }
        return payload
    }
}
