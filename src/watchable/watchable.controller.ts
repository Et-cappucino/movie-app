import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { WatchableService } from './services';
import { CreateWatchableDto, UpdateWatchableDto } from './dto';

@Controller('api/watchables')
export class WatchableController {
  constructor(private readonly watchableService: WatchableService) {}

  @Post()
  create(@Body() createWatchableDto: CreateWatchableDto) {
    return this.watchableService.create(createWatchableDto);
  }

  @Get()
  findAll() {
    return this.watchableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.watchableService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateWatchableDto: UpdateWatchableDto) {
    return this.watchableService.update(id, updateWatchableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.watchableService.remove(id);
  }
}
