import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { WatchableModule } from './watchable/watchable.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoriteGenresModule } from './favorite-genres/favorite-genres.module';
import { ProfilePictureModule } from './profile-picture/profile-picture.module';
import { ActorModule } from './actor/actor.module';
import { CastModule } from './cast/cast.module';
import { CommentModule } from './comment/comment.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    ProfileModule, 
    DatabaseModule, 
    UserModule, 
    WatchableModule, 
    WatchlistModule, 
    FavoritesModule, 
    FavoriteGenresModule, 
    ProfilePictureModule, 
    ActorModule, 
    CastModule, 
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
