import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    ProfileModule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
