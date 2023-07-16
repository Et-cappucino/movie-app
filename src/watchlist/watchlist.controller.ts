import { Controller, Param, Get, Delete, Put } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('api/watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @Get(':profileId')
    getProfileWatchlist(@Param('profileId') profileId: number) {
        return this.watchlistService.getProfileWatchlist(profileId);
    }
  
    @Put(':profileId/:watchableId')
    addToWatchlist(@Param('profileId') profileId: number,
                   @Param('watchableId') watchableId: number) {
        this.watchlistService.addToWatchlist(profileId, watchableId);
    }
  
    @Delete(':profileId/:watchableId')
    removeFromWatchlist(@Param('profileId') profileId: number,
                        @Param('watchableId') watchableId: number) {
        this.watchlistService.removeFromWatchlist(profileId, watchableId);
    }
}
