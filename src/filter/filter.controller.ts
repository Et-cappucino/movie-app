import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FilterService } from './filter.service';
import { WatchableType } from 'src/watchable/enums';
import { Watchable } from 'src/watchable/entities';
import { Public } from 'src/common/decorators';

@Public()
@ApiTags('Filter-Controller')
@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiQuery({ name: 'type', enum: WatchableType })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve all Watchables by Type with pagination and sorting support.' 
  })
  @Get()
  findAllWatchablesByType(@Query('pageNumber') pageNumber: number = 0, 
                          @Query('pageSize') pageSize: number = 10,
                          @Query('type') type: WatchableType) {
    return this.filterService.findAllWatchablesByType(pageNumber, pageSize, type);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiQuery({ name: 'type', enum: WatchableType, required: false })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve all latest Watchables by Type with pagination and sorting support.' 
  })
  @Get('latest')
  findLatest(@Query('pageNumber') pageNumber: number = 0, 
             @Query('pageSize') pageSize: number = 10,
             @Query('type') type: WatchableType) {
    return this.filterService.findLatest(pageNumber, pageSize, type);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiQuery({ name: 'type', enum: WatchableType, required: false })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve all popular Watchables by Type with pagination and sorting support.' 
  })
  @Get('popular')
  findPopular(@Query('pageNumber') pageNumber: number = 0, 
              @Query('pageSize') pageSize: number = 10,
              @Query('type') type: WatchableType) {
    return this.filterService.findPopular(pageNumber, pageSize, type);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiQuery({ name: 'type', enum: WatchableType, required: false })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve all upcoming Watchables by Type with pagination and sorting support.' 
  })
  @Get('upcoming')
  findUpcoming(@Query('pageNumber') pageNumber: number = 0, 
               @Query('pageSize') pageSize: number = 10,
               @Query('type') type: WatchableType) {
    return this.filterService.findUpcoming(pageNumber, pageSize, type);
  }
}
