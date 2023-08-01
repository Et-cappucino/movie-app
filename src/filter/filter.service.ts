import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Watchable } from 'src/watchable/entities';
import { WatchableType } from 'src/watchable/enums';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Watchable)
    private readonly watchableRepository: Repository<Watchable>
  ) {}

  async findAllWatchablesByType(type: WatchableType) {
    const watchables = await this.watchableRepository.find({
      where: {
        type
      }
    })

    return watchables; 
  }

  async findLatest(watchabletype?: WatchableType) {
    const watchables = await this.watchableRepository.find({
      where: {
        type: watchabletype ? watchabletype : null,
        releaseDate: Raw((alias) => `${alias} > :cutoffDate && ${alias} < :now`, { 
          cutoffDate: new Date(this.getCutoff(3)),
          now: new Date(),
        })
      }
    })
    
    return watchables; 
  }

  async findPopular(watchabletype?: WatchableType) {
    const watchables = await this.watchableRepository.find({
      where: {
        type: watchabletype ? watchabletype : null,
        rating: Raw((alias) => `${alias} >= :minRating`, { 
          minRating: 7.5,
        })
      }
    })
    
    return watchables; 
  }

  async findUpcoming(watchabletype?: WatchableType) {
    const watchables = await this.watchableRepository.find({
      where: {
        type: watchabletype ? watchabletype : null,
        releaseDate: Raw((alias) => `${alias} > :now`, { 
          now: new Date(),
        })
      }
    })
    
    return watchables; 
  }

  private getCutoff(monthsToSubtract) {
    const currentDate = new Date();
    return currentDate.setMonth(currentDate.getMonth() - monthsToSubtract);  
  }
}
