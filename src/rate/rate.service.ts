import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/create-rate.dto';

@Injectable()
export class RateService {

  create(createRateDto: CreateRateDto) {
    return 'This action adds a new rate';
  }

  findAllWatchableRates(id: number) {
    return `This action returns all rates of #${id} watchable`;
  }

  findAllProfileRates(id: number) {
    return `This action returns all rates of #${id} profile`;
  }
}
