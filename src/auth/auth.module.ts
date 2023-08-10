import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({}),
    UserModule,
    EventEmitterModule.forRoot()
  ],
  providers: [
    AuthService, 
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
