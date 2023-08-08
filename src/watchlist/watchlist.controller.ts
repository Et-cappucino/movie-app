import { Controller, Param, Get, Delete, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiQuery, ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { WatchlistService } from './watchlist.service';
import { Watchable } from 'src/watchable/entities';
import { GetCurrentUserId } from 'src/common/decorators';

@ApiTags('Watchlist-Controller')
@ApiBearerAuth()
@Controller('api/watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @ApiQuery({ name: 'pageNumber', example: 0 })
    @ApiQuery({ name: 'pageSize', example: 5 })
    @ApiOkResponse({ 
        type: Watchable, 
        isArray: true,
        description: 'Retrieve the watchlist of the User with pagination support.' 
    })
    @ApiUnauthorizedResponse({ description: 'Unauthorized to get a watchlist.' })
    @ApiNotFoundResponse({ description: 'Profile with provided id could not be found.' })
    @Get()
    getProfileWatchlist(@GetCurrentUserId() profileId: number,
                        @Query('pageNumber') pageNumber: number = 0, 
                        @Query('pageSize') pageSize: number = 5) {
        return this.watchlistService.getProfileWatchlist(profileId, pageNumber, pageSize);
    }
  
    @ApiOkResponse({ description: 'Watchable has been successfully added to a watchlist.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized to add watchable to a watchlist.' })
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found.' })
    @Put(':watchableId')
    addToWatchlist(@GetCurrentUserId() profileId: number,
                   @Param('watchableId') watchableId: number) {
        this.watchlistService.addToWatchlist(profileId, watchableId);
    }
  
    @ApiOkResponse({ description: 'Watchable has been successfully removed from a watchlist.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized to remove watchable from a watchlist.' })
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found.' })
    @Delete(':watchableId')
    removeFromWatchlist(@GetCurrentUserId() profileId: number,
                        @Param('watchableId') watchableId: number) {
        this.watchlistService.removeFromWatchlist(profileId, watchableId);
    }
}
