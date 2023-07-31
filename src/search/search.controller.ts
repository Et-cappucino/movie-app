import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GenreEnum, WatchableType } from 'src/watchable/enums';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchWatchables(@Query('query') query: string) {
    return this.searchService.searchWatchables(query);
  }

  @Get('userSearch')
  userSearchWatchables(@Query('query') query: string,
                       @Query('email') email: string) {
    return this.searchService.searchWatchables(query, email);
  }

  @Get('type-genre')
  searchWatchablesByTypeAndGenre(@Query('genre') genre: GenreEnum,
                                 @Query('type') type: WatchableType) {
    return this.searchService.findByTypeAndGenre(genre, type);
  }

  @Get('type-releaseYear')
  searchWatchablesByTypeAndReleaseYear(@Query('year') year: number,
                                       @Query('type') type: WatchableType) {
    return this.searchService.findByTypeAndReleaseYear(year, type);
  }
}
