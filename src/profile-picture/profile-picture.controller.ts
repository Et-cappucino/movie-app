import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProfilePictureService } from './profile-picture.service';
import { CreateProfilePictureDto } from './dto/create-profile-picture.dto';

@Controller('api/images')
export class ProfilePictureController {
  constructor(private readonly profilePictureService: ProfilePictureService) {}

  @Post()
  uploadProfilePicture(@Body() createProfilePictureDto: CreateProfilePictureDto) {
    return this.profilePictureService.uploadProfilePicture(createProfilePictureDto);
  }

  @Get(':id')
  getProfilePicture(@Param('id') id: number) {
    return this.profilePictureService.getProfilePicture(id);
  }

  @Delete(':id')
  removeProfilePicture(@Param('id') id: number) {
    return this.profilePictureService.removeProfilePicture(id);
  }
}
