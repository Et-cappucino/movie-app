import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ActorService } from './actor.service';
import { CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';
import { Public } from 'src/common/decorators';

@ApiTags('Actor-Controller')
@Controller('api/actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ 
    type: Actor, 
    description: 'The actor has been successfully created.' 
  })
  @Post()
  registerActor(@Body() createActorDto: CreateActorDto) {
    return this.actorService.registerActor(createActorDto);
  }

  @Public()
  @ApiQuery({ name: 'pageNumber', example: 0 })
  @ApiQuery({ name: 'pageSize', example: 10 })
  @ApiOkResponse({ 
    type: Actor, 
    isArray: true,
    description: 'Retrieve all Actors with pagination support.' 
  })
  @Get()
  findAll(@Query('pageNumber') pageNumber: number = 0, 
          @Query('pageSize') pageSize: number = 10) {
    return this.actorService.findAll(pageNumber, pageSize);
  }

  @Public()
  @ApiOkResponse({ type: Actor })
  @ApiNotFoundResponse({ description: 'Actor with provided id could not be found' })
  @Get(':id')
  findActor(@Param('id') id: number) {
    return this.actorService.findActor(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Actor })
  @ApiNotFoundResponse({ description: 'Actor with provided id could not be found' })
  @Put(':id')
  updateActor(@Param('id') id: number, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.updateActor(id, updateActorDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: Actor })
  @ApiNotFoundResponse({ description: 'Actor with provided id could not be found' })
  @Delete(':id')
  removeActor(@Param('id') id: number) {
    return this.actorService.removeActor(id);
  }
}
