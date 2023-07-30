import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/create-rate.dto';

@Controller('api/rates')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  rateWatchable(@Body() createRateDto: CreateRateDto) {
    this.rateService.create(createRateDto);
  }

  @Get('watchable-:watchableId')
  getWatchableRates(@Query('pageNumber') pageNumber: number = 0, 
                    @Query('pageSize') pageSize: number = 10,
                    @Param('watchableId') watchableId: number) {
    return this.rateService.findAllWatchableRates(watchableId, pageNumber, pageSize);
  }

  @Get('profile-:profileId')
  getProfileRates(@Query('pageNumber') pageNumber: number = 0, 
                  @Query('pageSize') pageSize: number = 10,
                  @Param('profileId') profileId: number) {
    return this.rateService.findAllProfileRates(profileId, pageNumber, pageSize);
  }
}
