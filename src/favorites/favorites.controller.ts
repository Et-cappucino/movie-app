import { Controller, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FavoriteWatchablesService } from './favorites.service';
import { Watchable } from 'src/watchable/entities';
import { GetCurrentUserId } from 'src/common/decorators';

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
    @ApiUnauthorizedResponse({ description: 'Unauthorized to get a favorites list.' })
    @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
    @Get(':profileId')
    getProfileFavorites(@GetCurrentUserId() profileId: number,
                        @Query('pageNumber') pageNumber: number = 0, 
                        @Query('pageSize') pageSize: number = 5) {
        return this.favoritesService.getProfileFavorites(profileId, pageNumber, pageSize);
    }
  
    @ApiOkResponse({ description: 'Watchable has been successfully addded to a favorites list.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized to add watchable to a favorites list.' })
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found.' })
    @Put(':watchableId')
    addToFavorites(@GetCurrentUserId() profileId: number,
                   @Param('watchableId') watchableId: number) {
        this.favoritesService.addToFavorites(profileId, watchableId);
    }
  
    @ApiOkResponse({ description: 'Watchable has been successfully removed from a favorites list.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized to remove watchable from a favorites list.' })
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found.' })
    @Delete(':watchableId')
    removeFromFavorites(@GetCurrentUserId() profileId: number,
                        @Param('watchableId') watchableId: number) {
        this.favoritesService.removeFromFavorites(profileId, watchableId);
    }
}
