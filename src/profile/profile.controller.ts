import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { Profile } from './entities/profile.entity';

@ApiTags('Profile-Controller')
@ApiBearerAuth()
@Controller('api/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized to create a profile.' })
  @ApiCreatedResponse({ 
    type: Profile,
    description: 'The profile has been successfully created.' 
  })
  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get all profiles.' })
  @ApiOkResponse({ 
    type: Profile, 
    isArray: true,
    description: 'Retrieve all Profiles with pagination support.' 
  })
  @Get()
  findAll(@Query('pageNumber') pageNumber: number = 0, 
          @Query('pageSize') pageSize: number = 5) {
    return this.profileService.findAll(pageNumber, pageSize);
  }

  @ApiOkResponse({ 
    type: Profile,
    description: 'Profile has been successfully found.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get a profile.' })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
  @Get(':id')
  findProfile(@Param('id') id: number) {
    return this.profileService.findOne(id);
  }

  @ApiOkResponse({ 
    type: Profile,
    description: 'Profile has been successfully updated.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update a profile.' })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
  @Put(':id')
  updateProfile(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOkResponse({ 
    type: Profile,
    description: 'Profile has been successfully deleted.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete a profile.' })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
  @Delete(':id')
  removeProfile(@Param('id') id: number) {
    return this.profileService.remove(id);
  }
}
