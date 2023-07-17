import { Injectable } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { UpdateFavoriteGenresDto } from './dto/favorite-genres.dto';
import { Genre } from 'src/watchable/entities';
import { GenreEnum } from 'src/watchable/enums';

@Injectable()
export class FavoriteGenresService {
  constructor(
    private readonly profileService: ProfileService
  ) {}

  async getProfileFavoriteGenres(profileId: number) {
    const profile = await this.profileService.findOne(profileId);
    return profile.favoriteGenres;
  }

  async addToFavoriteGenres(profileId: number, updateFavoriteGenresDto: UpdateFavoriteGenresDto) {
    const profile = await this.profileService.findOne(profileId);
  
    const genreEntity = new Genre();
    genreEntity.genre = updateFavoriteGenresDto.genreEnum;
      
    profile.favoriteGenres.push(genreEntity);
    this.profileService.save(profile);
  }

  async removeFromFavoriteGenres(profileId: number, genre: GenreEnum) {
    const profile = await this.profileService.findOne(profileId);
    profile.favoriteGenres = profile.favoriteGenres.filter((toBeRemoved) => genre !== toBeRemoved.genre);
    this.profileService.save(profile);
  }
}
