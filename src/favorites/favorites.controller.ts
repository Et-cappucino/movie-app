import { Controller, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { FavoriteWatchablesService } from './favorites.service';
import { Watchable } from 'src/watchable/entities';

@ApiTags('Favorite-Watchables-Controller')
@ApiBearerAuth()
@Controller('api/favorites')
export class FavoriteWatchablesController {

    constructor(private readonly favoritesService: FavoriteWatchablesService) {}

    @ApiQuery({ name: 'pageNumber', example: 0 })
    @ApiQuery({ name: 'pageSize', example: 5 })
    @ApiOkResponse({ 
        type: Watchable, 
        isArray: true,
        description: 'Retrieve the favorites of the User with pagination support.' 
    })
    @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
    @Get(':profileId')
    getProfileFavorites(@Param('profileId') profileId: number,
                        @Query('pageNumber') pageNumber: number = 0, 
                        @Query('pageSize') pageSize: number = 5) {
        return this.favoritesService.getProfileFavorites(profileId, pageNumber, pageSize);
    }
  
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found' })
    @Put(':profileId/:watchableId')
    addToFavorites(@Param('profileId') profileId: number,
                   @Param('watchableId') watchableId: number) {
        this.favoritesService.addToFavorites(profileId, watchableId);
    }
  
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found' })
    @Delete(':profileId/:watchableId')
    removeFromFavorites(@Param('profileId') profileId: number,
                        @Param('watchableId') watchableId: number) {
        this.favoritesService.removeFromFavorites(profileId, watchableId);
    }
}
