import { Module } from '@nestjs/common';
import { FavoriteWatchablesService } from './favorites.service';
import { FavoriteWatchablesController } from './favorites.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { WatchableModule } from 'src/watchable/watchable.module';

@Module({
  imports: [
    ProfileModule,
    WatchableModule
  ],
  controllers: [FavoriteWatchablesController],
  providers: [FavoriteWatchablesService]
})
export class FavoritesModule {}
