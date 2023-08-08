import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './entities/rate.entity';
import { GetCurrentUserId } from 'src/common/decorators';

@ApiTags('Rate-Controller')
@ApiBearerAuth()
@Controller('api/rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @ApiCreatedResponse({ 
    type: Rate, 
    description: 'The rate has been successfully created.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to rate a watchable.' })
  @Post()
  rateWatchable(@Body() createRateDto: CreateRateDto,
                @GetCurrentUserId() userId: number) {
    this.rateService.create(createRateDto, userId);
  }

  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get all rates of a watchable.' })
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
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get all rates of a profile.' })
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
