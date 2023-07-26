import { Injectable } from '@nestjs/common';
import { CreateActorDto, UpdateActorDto } from './dto';

@Injectable()
export class ActorService {

  registerActor(createActorDto: CreateActorDto) {
    return 'This action adds a new actor';
  }

  findAll() {
    return `This action returns all actor`;
  }

  findActor(id: number) {
    return `This action returns a #${id} actor`;
  }

  updateActor(id: number, updateActorDto: UpdateActorDto) {
    return `This action updates a #${id} actor`;
  }

  removeActor(id: number) {
    return `This action removes a #${id} actor`;
  }
}
