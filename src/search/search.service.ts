import { Injectable } from '@nestjs/common';
import { CreateSearchRecordDto } from './dto/create-search-record.dto';

@Injectable()
export class SearchService {

  searchWatchables() {
    return `This action returns all search`;
  }

  userSearchWatchable() {
    return `This action returns all search`;
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

  private create(createSearchRecordDto: CreateSearchRecordDto) {
    return 'This action adds a new search';
  }
}
