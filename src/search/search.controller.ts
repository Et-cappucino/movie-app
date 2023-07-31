import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { GenreEnum, WatchableType } from 'src/watchable/enums';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  searchWatchables(@Query('query') query: string,
                   @Query('pageNumber') pageNumber: number = 0, 
                   @Query('pageSize') pageSize: number = 5) {
    return this.searchService.searchWatchables(query, pageNumber, pageSize);
  }

  @Get('userSearch')
  userSearchWatchables(@Query('query') query: string,
                       @Query('email') email: string,
                       @Query('pageNumber') pageNumber: number = 0, 
                       @Query('pageSize') pageSize: number = 5) {
    return this.searchService.searchWatchables(query, pageNumber, pageSize, email);
  }

  @Get('type-genre')
  searchWatchablesByTypeAndGenre(@Query('genre') genre: GenreEnum,
                                 @Query('type') type: WatchableType,
                                 @Query('pageNumber') pageNumber: number = 0, 
                                 @Query('pageSize') pageSize: number = 5) {
    return this.searchService.findByTypeAndGenre(genre, pageNumber, pageSize, type);
  }

  @Get('type-releaseYear')
  searchWatchablesByTypeAndReleaseYear(@Query('year') year: number,
                                       @Query('type') type: WatchableType,
                                       @Query('pageNumber') pageNumber: number = 0, 
                                       @Query('pageSize') pageSize: number = 5) {
    return this.searchService.findByTypeAndReleaseYear(year, pageNumber, pageSize, type);
  }
}
