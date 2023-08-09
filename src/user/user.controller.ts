import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiConflictResponse, ApiQuery, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/enum/role';
import { HasRole } from 'src/common/decorators/has-role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@ApiTags('User-Controller')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HasRole(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiCreatedResponse({ 
    type: User,
    description: 'The user has been successfully created.' 
  })
  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to register a user.' })
  @ApiConflictResponse({ description: 'User with provided email already exists.' })
  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get all users.' })
  @ApiOkResponse({ 
    type: User, 
    isArray: true,
    description: 'Retrieve all Users with pagination support.' 
  })
  @Get()
  findAll(@Query('pageNumber') pageNumber: number = 0, 
          @Query('pageSize') pageSize: number = 5) {
    return this.userService.findAll(pageNumber, pageSize);
  }

  @ApiOkResponse({ 
    type: User, 
    description: 'User has been successfully found.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get a user.' })
  @ApiNotFoundResponse({ description: 'User with provided id could not be found.' })
  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({ 
    type: User, 
    description: 'User has been successfully updated.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update a user.' })
  @ApiNotFoundResponse({ description: 'User with provided id could not be found.' })
  @ApiConflictResponse({ description: 'User with provided email already exists.' })
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({ 
    type: User, 
    description: 'User has been successfully deleted.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete a user.' })
  @ApiNotFoundResponse({ description: 'User with provided id could not be found.' })
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
