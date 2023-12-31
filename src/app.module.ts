import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
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
import { RateModule } from './rate/rate.module';
import { SearchModule } from './search/search.module';
import { FilterModule } from './filter/filter.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './common/guards';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { EmailConfirmationTokenModule } from './email-confirmation-token/email-confirmation-token.module';


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
    RateModule, 
    SearchModule, 
    FilterModule, 
    AuthModule, 
    MailSenderModule, 
    EmailConfirmationTokenModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard
    }
  ],
})
export class AppModule {}
