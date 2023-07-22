import { Injectable } from '@nestjs/common';
import { ProfileService } from 'src/profile/profile.service';
import { WatchableService } from 'src/watchable/services';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class FavoriteWatchablesService {
    constructor(
      private readonly profileService: ProfileService,
      private readonly watchableService: WatchableService,
      private readonly paginationService: PaginationService
    ) {}
  
    async getProfileFavorites(profileId: number, pageNumber: number, pageSize: number) {
      const profile = await this.profileService.findOne(profileId);
      return this.paginationService.paginate(profile.favorites, pageNumber, pageSize);
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
