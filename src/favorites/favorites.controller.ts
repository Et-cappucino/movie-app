import { Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoriteWatchablesService } from './favorites.service';

@ApiTags('Favorite-Watchables-Controller')
@Controller('api/favorites')
export class FavoriteWatchablesController {

    constructor(private readonly favoritesService: FavoriteWatchablesService) {}

    @Get(':profileId')
    getProfileFavorites(@Param('profileId') profileId: number) {
        return this.favoritesService.getProfileFavorites(profileId);
    }
  
    @Put(':profileId/:watchableId')
    addToFavorites(@Param('profileId') profileId: number,
                   @Param('watchableId') watchableId: number) {
        this.favoritesService.addToFavorites(profileId, watchableId);
    }
  
    @Delete(':profileId/:watchableId')
    removeFromFavorites(@Param('profileId') profileId: number,
                        @Param('watchableId') watchableId: number) {
        this.favoritesService.removeFromFavorites(profileId, watchableId);
    }
}
