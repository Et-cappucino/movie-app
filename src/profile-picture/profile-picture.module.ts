import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';
import { ProfilePicture } from './entities/profile-picture.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfilePicture]),
    ProfileModule
  ],
  controllers: [ProfilePictureController],
  providers: [ProfilePictureService]
})
export class ProfilePictureModule {}
