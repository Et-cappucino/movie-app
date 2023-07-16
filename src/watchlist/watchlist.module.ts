import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { ProfileModule } from 'src/profile/profile.module';
import { WatchableModule } from 'src/watchable/watchable.module';

@Module({
  imports: [
    ProfileModule,
    WatchableModule
  ],
  controllers: [WatchlistController],
  providers: [WatchlistService]
})
export class WatchlistModule {}
