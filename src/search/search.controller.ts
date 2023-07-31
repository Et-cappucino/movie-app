import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchWatchables() {
    return this.searchService.searchWatchables();
  }

  @Get()
  userSearchWatchable() {
    return this.searchService.userSearchWatchable();
  }

  @Get()
  searchWatchableByGenre() {
    return this.searchService.searchWatchableByGenre();
  }

  @Get()
  searchWatchableByReleaseYear() {
    return this.searchService.searchWatchableByReleaseYear();
  }

  @Get()
  searchMovieByGenre() {
    return this.searchService.searchMovieByGenre();
  }

  @Get()
  searchSeriesByGenre() {
    return this.searchService.searchSeriesByGenre();
  }

  @Get()
  searchMovieByReleaseYear() {
    return this.searchService.searchMovieByReleaseYear();
  }

  @Get()
  searchSeriesByReleaseYear() {
    return this.searchService.searchSeriesByReleaseYear();
  }
}
