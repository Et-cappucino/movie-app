import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { Profile } from './entities/profile.entity';

@ApiTags('Profile-Controller')
@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiCreatedResponse({ 
    type: Profile,
    description: 'The profile has been successfully created.' 
  })
  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiOkResponse({ type: Profile, isArray: true })
  @Get()
  findAllProfiles() {
    return this.profileService.findAll();
  }

  @ApiOkResponse({ type: Profile })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
  @Get(':id')
  findProfile(@Param('id') id: number) {
    return this.profileService.findOne(id);
  }

  @ApiOkResponse({ type: Profile })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
  @Put(':id')
  updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOkResponse({ type: Profile })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
  @Delete(':id')
  removeProfile(@Param('id') id: number) {
    return this.profileService.remove(id);
  }
}
