import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';
import { ProfilePicture } from './entities/profile-picture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfilePicture])],
  controllers: [ProfilePictureController],
  providers: [ProfilePictureService]
})
export class ProfilePictureModule {}
