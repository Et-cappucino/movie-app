import { Injectable } from '@nestjs/common';

@Injectable()
export class CastService {

  getWatchableCast(watchableId: number) {
    return `This action returns a watchable cast`;
  }

  addToCast(watchableId: number, actorId: number) {
    return 'This action adds an actor to a watchable cast';
  }

  removeFromCast(watchableId: number, actorId: number) {
    return `This action removes an actor from a watchable cast`;
  }
}
