import { Controller, Get, Param, Delete, Put, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiQuery, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FavoriteGenresService } from './favorite-genres.service';
import { UpdateFavoriteGenresDto } from './dto/favorite-genres.dto';
import { GenreEnum } from 'src/watchable/enums';
import { Genre } from 'src/watchable/entities';

@ApiTags('Favorite-Genres-Controller')
@ApiBearerAuth()
@Controller('api/genres')
export class FavoriteGenresController {
  constructor(private readonly favoriteGenresService: FavoriteGenresService) {}

  @ApiOkResponse({ 
    type: Genre,
    isArray: true,
    description: 'Retrieve the favorite genre list of the User.' 
  })
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
  @Get(':profileId')
  getProfileFavoriteGenres(@Param('profileId') profileId: number) {
    return this.favoriteGenresService.getProfileFavoriteGenres(profileId);
  }
  
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
  @Put(':profileId')
  addToFavoriteGenres(@Param('profileId') profileId: number,
                      @Body() updateFavoriteGenresDto: UpdateFavoriteGenresDto) {
    this.favoriteGenresService.addToFavoriteGenres(profileId, updateFavoriteGenresDto);
  }

  @ApiQuery({ name: 'genre', enum: GenreEnum })
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
  @Delete(':profileId')
  removeFromFavoriteGenres(@Param('profileId') profileId: number,
                           @Query('genre') genre: GenreEnum) {
    this.favoriteGenresService.removeFromFavoriteGenres(profileId, genre);
  }
}
