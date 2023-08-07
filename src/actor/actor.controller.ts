import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ActorService } from './actor.service';
import { CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';
import { Public } from 'src/common/decorators';
import { HasRole } from 'src/common/decorators/has-role.decorator';
import { Role } from 'src/auth/enum/role';
import { RoleGuard } from 'src/common/guards/role.guard';

@ApiTags('Actor-Controller')
@Controller('api/actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @HasRole(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to create new actor.' })
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
  @ApiOkResponse({ 
    type: Actor,
    description: 'Actor has been successfully found.' 
  })
  @ApiNotFoundResponse({ description: 'Actor with provided id could not be found.' })
  @Get(':id')
  findActor(@Param('id') id: number) {
    return this.actorService.findActor(id);
  }

  @HasRole(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ 
    type: Actor,
    description: 'Actor has been successfully updated.' 
  })
  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to update actor.' })
  @ApiNotFoundResponse({ description: 'Actor with provided id could not be found.' })
  @Put(':id')
  updateActor(@Param('id') id: number, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.updateActor(id, updateActorDto);
  }

  @HasRole(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ 
    type: Actor,
    description: 'Actor has been successfully deleted.' 
  })
  @ApiForbiddenResponse({ description: 'Forbidden resource.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized to delete actor.' })
  @ApiNotFoundResponse({ description: 'Actor with provided id could not be found.' })
  @Delete(':id')
  removeActor(@Param('id') id: number) {
    return this.actorService.removeActor(id);
  }
}
