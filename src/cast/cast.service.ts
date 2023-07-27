import { Injectable } from '@nestjs/common';
import { ActorService } from 'src/actor/actor.service';
import { WatchableService } from 'src/watchable/services';

@Injectable()
export class CastService {
  constructor(
    private readonly actorService: ActorService,
    private readonly watchableService: WatchableService
  ) {}

  async getWatchableCast(watchableId: number) {
    const watchable = await this.watchableService.findOne(watchableId);
    return watchable.cast
  }

  async addToCast(watchableId: number, actorId: number) {
    const watchable = await this.watchableService.findOne(watchableId);
    const actor = await this.actorService.findActor(actorId);
    
    watchable.cast.push(actor);    
    this.watchableService.save(watchable);
  }

  async removeFromCast(watchableId: number, actorId: number) {
    const watchable = await this.watchableService.findOne(watchableId);
    const actor = await this.actorService.findActor(actorId);

    watchable.cast = watchable.cast.filter((toBeRemoved) => actor.id !== toBeRemoved.id);
    this.watchableService.save(watchable);
  }
}
