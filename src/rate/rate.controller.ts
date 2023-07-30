import { Controller, Get, Post, Body, Param } from '@nestjs/common';
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
  getWatchableRates(@Param('watchableId') watchableId: number) {
    return this.rateService.findAllWatchableRates(watchableId);
  }

  @Get('profile-:profileId')
  getProfileRates(@Param('profileId') profileId: number) {
    return this.rateService.findAllProfileRates(profileId);
  }
}
