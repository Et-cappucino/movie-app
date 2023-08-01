import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filter.service';
import { WatchableType } from 'src/watchable/enums';

@Controller('api/filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  findAllWatchablesByType(@Query('type') type: WatchableType) {
    return this.filterService.findAllWatchablesByType(type);
  }

  @Get('latest')
  findLatest(@Query('type') type: WatchableType) {
    return this.filterService.findLatest(type);
  }

  @Get('popular')
  findPopular(@Query('type') type: WatchableType) {
    return this.filterService.findPopular(type);
  }

  @Get('upcoming')
  findUpcoming(@Query('type') type: WatchableType) {
    return this.filterService.findUpcoming(type);
  }
}
