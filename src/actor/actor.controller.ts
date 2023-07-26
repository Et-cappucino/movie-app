import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto, UpdateActorDto } from './dto';

@Controller('api/actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  registerActor(@Body() createActorDto: CreateActorDto) {
    return this.actorService.registerActor(createActorDto);
  }

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  findActor(@Param('id') id: number) {
    return this.actorService.findActor(id);
  }

  @Put(':id')
  updateActor(@Param('id') id: number, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.updateActor(id, updateActorDto);
  }

  @Delete(':id')
  removeActor(@Param('id') id: number) {
    return this.actorService.removeActor(id);
  }
}
