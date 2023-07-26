import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
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
  findAll(@Query('pageNumber') pageNumber: number = 0, @Query('pageSize') pageSize: number = 10) {
    return this.actorService.findAll(pageNumber, pageSize);
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
