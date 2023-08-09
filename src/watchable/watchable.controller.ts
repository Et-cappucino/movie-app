import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { WatchableService } from './services';
import { CreateWatchableDto, UpdateWatchableDto } from './dto';
import { Watchable } from './entities';
import { Public } from 'src/common/decorators';
import { Role } from 'src/auth/enum/role';
import { HasRole } from 'src/common/decorators/has-role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';

@ApiTags('Watchable-Controller')
@Controller('watchables')
export class WatchableController {
  constructor(private readonly watchableService: WatchableService) {}

  @HasRole(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create watchable.' })
  @ApiCreatedResponse({ 
    type: Watchable, 
    description: 'The watchable has been successfully created.' 
  })
  @Post()
  create(@Body() createWatchableDto: CreateWatchableDto) {
    return this.watchableService.create(createWatchableDto);
  }

  @Public()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve all Watchables with pagination support.' 
  })
  @Get()
  findAll(@Query('pageNumber') pageNumber: number = 0, 
          @Query('pageSize') pageSize: number = 5) {
    return this.watchableService.findAll(pageNumber, pageSize);
  }

  @Public()
  @ApiOkResponse({ 
    type: Watchable, 
    description: 'Watchable has been successfully found.' 
  })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found.' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.watchableService.findOne(id);
  }

  @HasRole(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ 
    type: Watchable, 
    description: 'Watchable has been successfully updated.' 
  })
  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update watchable.' })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found.' })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateWatchableDto: UpdateWatchableDto) {
    return this.watchableService.update(id, updateWatchableDto);
  }

  @HasRole(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ 
    type: Watchable, 
    description: 'Watchable has been successfully deleted.' 
  })
  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete watchable.' })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found.' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.watchableService.remove(id);
  }
}
