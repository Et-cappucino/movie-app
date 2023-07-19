import { Injectable } from "@nestjs/common";
import { ProfileService } from "src/profile/profile.service";
import { WatchableService } from "../watchable/services/watchable.service";

@Injectable()
export class WatchlistService {
  constructor(
    private readonly profileService: ProfileService,
    private readonly watchableService: WatchableService
  ) {}

  async getProfileWatchlist(profileId: number) {
    const profile = await this.profileService.findOne(profileId);
    return profile.watchlist;
  }

  async addToWatchlist(profileId: number, watchableId: number) {
    const profile = await this.profileService.findOne(profileId);
    const watchable = await this.watchableService.findOne(watchableId);
  
    profile.watchlist.push(watchable);    
    this.profileService.save(profile);
  }

  async removeFromWatchlist(profileId: number, watchableId: number) {
    const profile = await this.profileService.findOne(profileId);
    const watchable = await this.watchableService.findOne(watchableId);
    
    profile.watchlist = profile.watchlist.filter((toBeRemoved) => watchable.id !== toBeRemoved.id);
    this.profileService.save(profile);
  }
}