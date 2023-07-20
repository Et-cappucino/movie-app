import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { WatchableService } from './services';
import { CreateWatchableDto, UpdateWatchableDto } from './dto';
import { Watchable } from './entities';

@ApiTags('Watchable-Controller')
@Controller('api/watchables')
export class WatchableController {
  constructor(private readonly watchableService: WatchableService) {}

  @ApiCreatedResponse({ 
    type: Watchable, 
    description: 'The watchable has been successfully created.' 
  })
  @Post()
  create(@Body() createWatchableDto: CreateWatchableDto) {
    return this.watchableService.create(createWatchableDto);
  }

  @ApiOkResponse({ type: Watchable, isArray: true })
  @Get()
  findAll() {
    return this.watchableService.findAll();
  }

  @ApiOkResponse({ type: Watchable })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.watchableService.findOne(id);
  }

  @ApiOkResponse({ type: Watchable })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found' })
  @Put(':id')
  update(@Param('id') id: number, @Body() updateWatchableDto: UpdateWatchableDto) {
    return this.watchableService.update(id, updateWatchableDto);
  }

  @ApiOkResponse({ type: Watchable })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.watchableService.remove(id);
  }
}
