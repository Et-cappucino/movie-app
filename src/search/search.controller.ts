import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { GenreEnum, WatchableType } from 'src/watchable/enums';
import { Watchable } from 'src/watchable/entities';
import { GetCurrentUserEmail, Public } from 'src/common/decorators';

@ApiTags('Search-Controller')
@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve Watchables by search with pagination and sorting support.' 
  })
  @Get()
  searchWatchables(@Query('query') query: string,
                   @Query('pageNumber') pageNumber: number = 0, 
                   @Query('pageSize') pageSize: number = 5) {
    return this.searchService.searchWatchables(query, pageNumber, pageSize);
  }

  @ApiBearerAuth()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to search watchables.' })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve Watchables by search with pagination and sorting support when Logged In.' 
  })
  @Get('userSearch')
  userSearchWatchables(@Query('query') query: string,
                       @Query('pageNumber') pageNumber: number = 0, 
                       @Query('pageSize') pageSize: number = 5,
                       @GetCurrentUserEmail() email: string) {
    return this.searchService.searchWatchables(query, pageNumber, pageSize, email);
  }

  @Public()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiQuery({ name: 'genre', enum: GenreEnum })
  @ApiQuery({ name: 'type', enum: WatchableType, required: false })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve Watchables by Genre and Type search with pagination and sorting support.' 
  })
  @Get('type-genre')
  searchWatchablesByTypeAndGenre(@Query('genre') genre: GenreEnum,
                                 @Query('type') type: WatchableType,
                                 @Query('pageNumber') pageNumber: number = 0, 
                                 @Query('pageSize') pageSize: number = 5) {
    return this.searchService.findByTypeAndGenre(genre, pageNumber, pageSize, type);
  }

  @Public()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 5 })
  @ApiQuery({ name: 'type', enum: WatchableType, required: false })
  @ApiOkResponse({ 
    type: Watchable, 
    isArray: true,
    description: 'Retrieve Watchables by ReleaseYear and Type search with pagination and sorting support.' 
  })
  @Get('type-releaseYear')
  searchWatchablesByTypeAndReleaseYear(@Query('year') year: number,
                                       @Query('type') type: WatchableType,
                                       @Query('pageNumber') pageNumber: number = 0, 
                                       @Query('pageSize') pageSize: number = 5) {
    return this.searchService.findByTypeAndReleaseYear(year, pageNumber, pageSize, type);
  }
}
