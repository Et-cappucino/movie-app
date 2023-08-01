import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filter.service';
import { WatchableType } from 'src/watchable/enums';

@Controller('api/filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get()
  findAllWatchablesByType(@Query('pageNumber') pageNumber: number = 0, 
                          @Query('pageSize') pageSize: number = 10,
                          @Query('type') type: WatchableType) {
    return this.filterService.findAllWatchablesByType(pageNumber, pageSize, type);
  }

  @Get('latest')
  findLatest(@Query('pageNumber') pageNumber: number = 0, 
             @Query('pageSize') pageSize: number = 10,
             @Query('type') type: WatchableType) {
    return this.filterService.findLatest(pageNumber, pageSize, type);
  }

  @Get('popular')
  findPopular(@Query('pageNumber') pageNumber: number = 0, 
              @Query('pageSize') pageSize: number = 10,
              @Query('type') type: WatchableType) {
    return this.filterService.findPopular(pageNumber, pageSize, type);
  }

  @Get('upcoming')
  findUpcoming(@Query('pageNumber') pageNumber: number = 0, 
               @Query('pageSize') pageSize: number = 10,
               @Query('type') type: WatchableType) {
    return this.filterService.findUpcoming(pageNumber, pageSize, type);
  }
}
