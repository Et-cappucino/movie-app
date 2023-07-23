import { Module } from '@nestjs/common';
import { FavoriteWatchablesService } from './favorites.service';
import { FavoriteWatchablesController } from './favorites.controller';
import { ProfileModule } from 'src/profile/profile.module';
import { WatchableModule } from 'src/watchable/watchable.module';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    ProfileModule,
    WatchableModule,
    PaginationModule
  ],
  controllers: [FavoriteWatchablesController],
  providers: [FavoriteWatchablesService]
})
export class FavoritesModule {}
