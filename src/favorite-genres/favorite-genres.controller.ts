import { Controller, Get, Param, Delete, Put, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiQuery, ApiNotFoundResponse, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FavoriteGenresService } from './favorite-genres.service';
import { UpdateFavoriteGenresDto } from './dto/favorite-genres.dto';
import { GenreEnum } from 'src/watchable/enums';
import { Genre } from 'src/watchable/entities';
import { GetCurrentUserId } from 'src/common/decorators';

@ApiTags('Favorite-Genres-Controller')
@ApiBearerAuth()
@Controller('genres')
export class FavoriteGenresController {
  constructor(private readonly favoriteGenresService: FavoriteGenresService) {}

  @ApiOkResponse({ 
    type: Genre,
    isArray: true,
    description: 'Retrieve the favorite genre list of the User.' 
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to get the favorite genre list of the User.' })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
  @Get()
  getProfileFavoriteGenres(@GetCurrentUserId() profileId: number) {
    return this.favoriteGenresService.getProfileFavoriteGenres(profileId);
  }
  
  @ApiOkResponse({ description: 'Genre has been successfully added to a favorite genre list.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to add genre to a favorite genre list.' })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
  @Put()
  addToFavoriteGenres(@GetCurrentUserId() profileId: number,
                      @Body() updateFavoriteGenresDto: UpdateFavoriteGenresDto) {
    this.favoriteGenresService.addToFavoriteGenres(profileId, updateFavoriteGenresDto);
  }

  @ApiQuery({ name: 'genre', enum: GenreEnum })
  @ApiOkResponse({ description: 'Genre has been successfully removed from a favorite genre list.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to remove genre from a favorite genre list.' })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
  @Delete()
  removeFromFavoriteGenres(@GetCurrentUserId() profileId: number,
                           @Query('genre') genre: GenreEnum) {
    this.favoriteGenresService.removeFromFavoriteGenres(profileId, genre);
  }
}
