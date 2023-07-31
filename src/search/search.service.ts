import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { SearchRecord } from './entities/search-record.entity';
import { Genre, Watchable } from 'src/watchable/entities';
import { UserService } from 'src/user/user.service';
import { GenreEnum, WatchableType } from 'src/watchable/enums';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(SearchRecord)
    private readonly searchRecordRepository: Repository<SearchRecord>,
    
    @InjectRepository(Watchable)
    private readonly watchableRepository: Repository<Watchable>,
    private readonly userService: UserService
  ) {}

  async searchWatchables(query: string, email?: string) {
    if (email) {
      this.createSearchRecord(query, email)
    }
    const searchResult = await this.findByNameStartingWith(query);
    return searchResult  
  }

  async findByTypeAndGenre(genre: GenreEnum, watchableType?: WatchableType) {
    const genreEntity = new Genre();
    genreEntity.genre = genre

    const watchables = await this.watchableRepository.find({
      where: {
        type: watchableType ? watchableType : null,
        genres: genreEntity
      }
    })

    return watchables
  }

  async findByTypeAndReleaseYear(releaseYear: number, watchableType?: WatchableType) {
    const watchables = await this.watchableRepository.find({
      where: {
        type: watchableType ? watchableType : null,
        releaseDate: Raw((alias) => `${alias} > :startDate && ${alias} < :endDate`, { 
          startDate: new Date(`${releaseYear}-01-01`),
          endDate: new Date(`${releaseYear + 1}-01-01`),
        })
      }
    });

    return watchables;
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
    .getMany();
    
    return watchables
  }
}
