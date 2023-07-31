import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchWatchables(@Query('query') query: string) {
    return this.searchService.searchWatchables(query);
  }

  @Get('userSearch')
  userSearchWatchable(@Query('query') query: string,
                      @Query('email') email: string) {
    return this.searchService.searchWatchables(query, email);
  }

  @Get('genre')
  searchWatchableByGenre() {
    return this.searchService.searchWatchableByGenre();
  }

  @Get('releaseYear')
  searchWatchableByReleaseYear() {
    return this.searchService.searchWatchableByReleaseYear();
  }

  @Get('movie/genre')
  searchMovieByGenre() {
    return this.searchService.searchMovieByGenre();
  }

  @Get('series/genre')
  searchSeriesByGenre() {
    return this.searchService.searchSeriesByGenre();
  }

  @Get('movie/releaseYear')
  searchMovieByReleaseYear() {
    return this.searchService.searchMovieByReleaseYear();
  }

  @Get('series/releaseYear')
  searchSeriesByReleaseYear() {
    return this.searchService.searchSeriesByReleaseYear();
  }
}
