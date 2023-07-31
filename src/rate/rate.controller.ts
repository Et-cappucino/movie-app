import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './entities/rate.entity';

@ApiTags('Rate-Controller')
@Controller('api/rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @ApiCreatedResponse({ 
    type: Rate, 
    description: 'The rate has been successfully created.' 
  })
  @Post()
  rateWatchable(@Body() createRateDto: CreateRateDto) {
    this.rateService.create(createRateDto);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiOkResponse({ 
    type: Rate, 
    isArray: true,
    description: 'Retrieve all Rates of a particular Watchable by ID with pagination and sorting support.' 
  })
  @Get('watchable-:watchableId')
  getWatchableRates(@Query('pageNumber') pageNumber: number = 0, 
                    @Query('pageSize') pageSize: number = 10,
                    @Param('watchableId') watchableId: number) {
    return this.rateService.findAllWatchableRates(watchableId, pageNumber, pageSize);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiOkResponse({ 
    type: Rate, 
    isArray: true,
    description: 'Retrieve all Rates of a particular Profile by ID with pagination and sorting support.' 
  })
  @Get('profile-:profileId')
  getProfileRates(@Query('pageNumber') pageNumber: number = 0, 
                  @Query('pageSize') pageSize: number = 10,
                  @Param('profileId') profileId: number) {
    return this.rateService.findAllProfileRates(profileId, pageNumber, pageSize);
  }
}