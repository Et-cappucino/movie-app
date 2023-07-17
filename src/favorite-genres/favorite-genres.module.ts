import { Module } from '@nestjs/common';
import { FavoriteGenresService } from './favorite-genres.service';
import { FavoriteGenresController } from './favorite-genres.controller';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [ProfileModule],
  controllers: [FavoriteGenresController],
  providers: [FavoriteGenresService]
})
export class FavoriteGenresModule {}
