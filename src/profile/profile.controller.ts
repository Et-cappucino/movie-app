import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@ApiTags('Profile-Controller')
@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAllProfiles() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findProfile(@Param('id') id: number) {
    return this.profileService.findOne(id);
  }

  @Put(':id')
  updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  removeProfile(@Param('id') id: number) {
    return this.profileService.remove(id);
  }
}
