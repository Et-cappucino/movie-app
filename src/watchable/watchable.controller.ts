import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { WatchableService } from './services';
import { CreateWatchableDto, UpdateWatchableDto } from './dto';
import { Watchable } from './entities';
import { Public } from 'src/common/decorators';

@ApiTags('Watchable-Controller')
@Controller('api/watchables')
export class WatchableController {
  constructor(private readonly watchableService: WatchableService) {}

  @ApiBearerAuth()
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
  @ApiOkResponse({ type: Watchable })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.watchableService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Watchable })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found' })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateWatchableDto: UpdateWatchableDto) {
    return this.watchableService.update(id, updateWatchableDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Watchable })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.watchableService.remove(id);
  }
}
