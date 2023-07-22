import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { ProfileModule } from 'src/profile/profile.module';
import { WatchableModule } from 'src/watchable/watchable.module';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    ProfileModule,
    WatchableModule,
    PaginationModule
  ],
  controllers: [WatchlistController],
  providers: [WatchlistService]
})
export class WatchlistModule {}
