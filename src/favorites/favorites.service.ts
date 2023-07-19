import { Injectable } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { WatchableService } from 'src/watchable/services';

@Injectable()
export class FavoriteWatchablesService {
    constructor(
      private readonly profileService: ProfileService,
      private readonly watchableService: WatchableService
    ) {}
  
    async getProfileFavorites(profileId: number) {
      const profile = await this.profileService.findOne(profileId);
      return profile.favorites;
    }
  
    async addToFavorites(profileId: number, watchableId: number) {
      const profile = await this.profileService.findOne(profileId);
      const watchable = await this.watchableService.findOne(watchableId);
    
      profile.favorites.push(watchable);    
      this.profileService.save(profile);
    }
  
    async removeFromFavorites(profileId: number, watchableId: number) {
      const profile = await this.profileService.findOne(profileId);
      const watchable = await this.watchableService.findOne(watchableId);
      
      profile.favorites = profile.favorites.filter((toBeRemoved) => watchable.id !== toBeRemoved.id);
      this.profileService.save(profile);
    }
  }
