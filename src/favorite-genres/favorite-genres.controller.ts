import { Controller, Get, Param, Delete, Put, Body, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteGenresService } from './favorite-genres.service';
import { UpdateFavoriteGenresDto } from './dto/favorite-genres.dto';
import { GenreEnum } from 'src/watchable/enums';

@ApiTags('Favorite-Genres-Controller')
@Controller('api/genres')
export class FavoriteGenresController {
  constructor(private readonly favoriteGenresService: FavoriteGenresService) {}

  @Get(':profileId')
  getProfileFavoriteGenres(@Param('profileId') profileId: number) {
    return this.favoriteGenresService.getProfileFavoriteGenres(profileId);
  }
  
  @Put(':profileId')
  addToFavoriteGenres(@Param('profileId') profileId: number,
                      @Body() updateFavoriteGenresDto: UpdateFavoriteGenresDto) {
    this.favoriteGenresService.addToFavoriteGenres(profileId, updateFavoriteGenresDto);
  }

  @Delete(':profileId')
  removeFromFavoriteGenres(@Param('profileId') profileId: number,
                           @Query('genre') genre: GenreEnum) {
    this.favoriteGenresService.removeFromFavoriteGenres(profileId, genre);
  }
}
