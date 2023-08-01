import { Injectable } from '@nestjs/common';
import { WatchableType } from 'src/watchable/enums';

@Injectable()
export class FilterService {

  findAllWatchablesByType(type?: WatchableType) {
    return `This action returns all filter`; 
  }

  findLatest(type?: WatchableType) {
    return `This action returns all filter`; 
  }

  findPopular(type?: WatchableType) {
    return `This action returns all filter`; 
  }

  findUpcoming(type?: WatchableType) {
    return `This action returns all filter`; 
  }
}
