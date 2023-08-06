import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CastService } from './cast.service';
import { Actor } from 'src/actor/entities/actor.entity';
import { Public } from 'src/common/decorators';

@ApiTags('Cast-Controller')
@Controller('api/cast')
export class CastController {
  constructor(private readonly castService: CastService) {}

  @Public()
  @ApiOkResponse({ 
    type: Actor, 
    isArray: true,
    description: 'Retrieve the cast of the Watchable.' 
  })
  @ApiNotFoundResponse({ description: 'Watchable with provided id could not be found.' })
  @Get(':watchableId')
  getWatchableCast(@Param('watchableId') watchableId: number) {
    return this.castService.getWatchableCast(watchableId);
  }
  
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Actor has been successfully added to a cast.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to add actor to cast.' })
  @ApiNotFoundResponse({ description: 'Watchable or actor with provided ids could not be found.' })
  @Post(':watchableId/:actorId')
  addToCast(@Param('watchableId') watchableId: number, 
  @Param('actorId') actorId: number) {
    return this.castService.addToCast(watchableId, actorId);
  }
  
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Actor has been successfully removed from a cast.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to remove actor from cast.' })
  @ApiNotFoundResponse({ description: 'Watchable or actor with provided ids could not be found.' })
  @Delete(':watchableId/:actorId')
  removeFromCast(@Param('watchableId') watchableId: number, 
                 @Param('actorId') actorId: number) {
    return this.castService.removeFromCast(watchableId, actorId);
  }
}
