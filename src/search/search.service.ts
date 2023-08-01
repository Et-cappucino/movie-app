import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { SearchRecord } from './entities/search-record.entity';
import { Genre, Watchable } from 'src/watchable/entities';
import { UserService } from 'src/user/user.service';
import { GenreEnum, WatchableType } from 'src/watchable/enums';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchRecord)
    private readonly searchRecordRepository: Repository<SearchRecord>,
    
    @InjectRepository(Watchable)
    private readonly watchableRepository: Repository<Watchable>,
    private readonly userService: UserService,
    private readonly paginationService: PaginationService
  ) {}

  async searchWatchables(query: string, pageNumber: number, pageSize: number, email?: string) {
    if (email) {
      this.createSearchRecord(query, email)
    }
    const searchResult = await this.findByNameStartingWith(query);
    return this.paginationService.paginate(searchResult, pageNumber, pageSize); 
  }

  async findByTypeAndGenre(genre: GenreEnum, pageNumber: number, pageSize: number, watchableType?: WatchableType) {
    const genreEntity = new Genre();
    genreEntity.genre = genre

    const [watchables, count] = await this.watchableRepository.findAndCount({
      where: {
        type: watchableType ? watchableType : null,
        genres: genreEntity
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        rating: 'DESC'
      },
    })

    return this.paginationService.paginate(watchables, pageNumber, pageSize, count);
  }

  async findByTypeAndReleaseYear(releaseYear: number, pageNumber: number, pageSize: number, watchableType?: WatchableType) {
    const [watchables, count] = await this.watchableRepository.findAndCount({
      where: {
        type: watchableType ? watchableType : null,
        releaseDate: Raw((alias) => `${alias} > :startDate && ${alias} < :endDate`, { 
          startDate: new Date(`${releaseYear}-01-01`),
          endDate: new Date(`${releaseYear + 1}-01-01`),
        })
      },
      skip: pageNumber * pageSize,
      take: pageSize,
      order: {
        releaseDate: 'DESC'
      },
    });

    return this.paginationService.paginate(watchables, pageNumber, pageSize, count);
  }

  private async createSearchRecord(query: string, email: string) {
    const user = await this.userService.findByEmail(email);

    const searchRecord = this.searchRecordRepository.create();
    searchRecord.text = query
    searchRecord.profile = user.profile

    this.searchRecordRepository.save(searchRecord)
  }

  private async findByNameStartingWith(title: string) {
    const watchables = await this.watchableRepository
    .createQueryBuilder('watchable')
    .where('watchable.name LIKE :title', { title: `${title}%` })
    .orderBy('watchable.rating', 'DESC')
    .getMany();
    
    return watchables
  }
}
