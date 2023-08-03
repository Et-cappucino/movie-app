import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiConflictResponse, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@ApiTags('User-Controller')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ 
    type: User,
    description: 'The user has been successfully created.' 
  })
  @ApiConflictResponse({ description: 'User with provided email already exists' })
  @Post()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
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

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User with provided id could not be found' })
  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User with provided id could not be found' })
  @ApiConflictResponse({ description: 'User with provided email already exists' })
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ description: 'User with provided id could not be found' })
  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
