import { Module } from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { ProfilePictureController } from './profile-picture.controller';

@Module({
  imports: [],
  controllers: [ProfilePictureController],
  providers: [ProfilePictureService]
})
export class ProfilePictureModule {}
