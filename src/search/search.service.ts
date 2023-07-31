import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchRecord } from './entities/search-record.entity';
import { Watchable } from 'src/watchable/entities';
import { UserService } from 'src/user/user.service';

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

  searchWatchableByGenre() {
    return `This action returns all search`;
  }

  searchWatchableByReleaseYear() {
    return `This action returns all search`;
  }

  searchMovieByGenre() {
    return `This action returns all search`;
  }

  searchSeriesByGenre() {
    return `This action returns all search`;
  }

  searchMovieByReleaseYear() {
    return `This action returns all search`;
  }

  searchSeriesByReleaseYear() {
    return `This action returns all search`;
  }

  private async createSearchRecord(query: string, email: string) {
    const user = await this.userService.findByEmail(email);

    const searchRecord = this.searchRecordRepository.create();
    searchRecord.text = query
    searchRecord.profile = user.profile

    this.searchRecordRepository.save(searchRecord)
  }

  private async findByNameStartingWith(title: string) {
    const watchables = await this.watchableRepository.createQueryBuilder('watchable')
    .where('watchable.name LIKE :title', { title: `${title}%` })
    .getMany();
    
    return watchables
  }
}
