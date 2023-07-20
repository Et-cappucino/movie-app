import { Controller, Param, Get, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { WatchlistService } from './watchlist.service';
import { Watchable } from 'src/watchable/entities';

@ApiTags('Watchlist-Controller')
@Controller('api/watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @ApiOkResponse({ type: Watchable, isArray: true })
    @ApiNotFoundResponse({ description: 'Profile with provided id could not be found' })
    @Get(':profileId')
    getProfileWatchlist(@Param('profileId') profileId: number) {
        return this.watchlistService.getProfileWatchlist(profileId);
    }
  
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found' })
    @Put(':profileId/:watchableId')
    addToWatchlist(@Param('profileId') profileId: number,
                   @Param('watchableId') watchableId: number) {
        this.watchlistService.addToWatchlist(profileId, watchableId);
    }
  
    @ApiOkResponse()
    @ApiNotFoundResponse({ description: 'Watchable or profile with provided ids could not be found' })
    @Delete(':profileId/:watchableId')
    removeFromWatchlist(@Param('profileId') profileId: number,
                        @Param('watchableId') watchableId: number) {
        this.watchlistService.removeFromWatchlist(profileId, watchableId);
    }
}
