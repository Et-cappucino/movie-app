import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CastService } from './cast.service';

@Controller('api/cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @Get(':watchableId')
  getWatchableCast(@Param('watchableId') watchableId: number) {
    return this.castService.getWatchableCast(watchableId);
  }

  @Post(':watchableId/:actorId')
  addToCast(@Param('watchableId') watchableId: number, @Param('actorId') actorId: number) {
    return this.castService.addToCast(watchableId, actorId);
  }

  @Delete(':watchableId/:actorId')
  removeFromCast(@Param('watchableId') watchableId: number, @Param('actorId') actorId: number) {
    return this.castService.removeFromCast(watchableId, actorId);
  }
}
