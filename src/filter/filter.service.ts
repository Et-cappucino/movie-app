import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Watchable } from 'src/watchable/entities';
import { WatchableType } from 'src/watchable/enums';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Watchable)
    private readonly watchableRepository: Repository<Watchable>,
    private readonly paginationService: PaginationService
  ) {}

  async findAllWatchablesByType(pageNumber: number, pageSize: number, type: WatchableType) {
    const [watchables, count] = await this.watchableRepository.findAndCount({
      where: {
        type
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        releaseDate: 'DESC'
      }
    })

    return this.paginationService.paginate(watchables, pageNumber, pageSize, count); 
  }

  async findLatest(pageNumber: number, pageSize: number, watchabletype?: WatchableType) {
    const [watchables, count] = await this.watchableRepository.findAndCount({
      where: {
        type: watchabletype ? watchabletype : null,
        releaseDate: Raw((alias) => `${alias} > :cutoffDate && ${alias} < :now`, { 
          cutoffDate: new Date(this.getCutoff(3)),
          now: new Date(),
        })
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        releaseDate: 'DESC'
      }
    })
    
    return this.paginationService.paginate(watchables, pageNumber, pageSize, count); 
  }

  async findPopular(pageNumber: number, pageSize: number, watchabletype?: WatchableType) {
    const [watchables, count] = await this.watchableRepository.findAndCount({
      where: {
        type: watchabletype ? watchabletype : null,
        rating: Raw((alias) => `${alias} >= :minRating`, { 
          minRating: 7.5,
        })
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        rating: 'DESC'
      }
    })
    
    return this.paginationService.paginate(watchables, pageNumber, pageSize, count); 
  }

  async findUpcoming(pageNumber: number, pageSize: number, watchabletype?: WatchableType) {
    const [watchables, count] = await this.watchableRepository.findAndCount({
      where: {
        type: watchabletype ? watchabletype : null,
        releaseDate: Raw((alias) => `${alias} > :now`, { 
          now: new Date(),
        })
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        releaseDate: 'DESC'
      }
    })
    
    return this.paginationService.paginate(watchables, pageNumber, pageSize, count); 
  }

  private getCutoff(monthsToSubtract) {
    const currentDate = new Date();
    return currentDate.setMonth(currentDate.getMonth() - monthsToSubtract);  
  }
}
