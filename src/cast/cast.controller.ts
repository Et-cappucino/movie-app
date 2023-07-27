import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CastService } from './cast.service';
import { Actor } from 'src/actor/entities/actor.entity';

@ApiTags('Cast-Controller')
@Controller('api/cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @ApiOkResponse({ 
    type: Actor, 
    isArray: true,
    description: 'Retrieve the cast of the Watchable.' 
  })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found' })
  @Get(':watchableId')
  getWatchableCast(@Param('watchableId') watchableId: number) {
    return this.castService.getWatchableCast(watchableId);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Watchable or actor with provided ids could not be found' })
  @Post(':watchableId/:actorId')
  addToCast(@Param('watchableId') watchableId: number, 
            @Param('actorId') actorId: number) {
    return this.castService.addToCast(watchableId, actorId);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Watchable or actor with provided ids could not be found' })
  @Delete(':watchableId/:actorId')
  removeFromCast(@Param('watchableId') watchableId: number, 
                 @Param('actorId') actorId: number) {
    return this.castService.removeFromCast(watchableId, actorId);
  }
}
