import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>
  ){}

  registerActor(createActorDto: CreateActorDto) {
    const actor = this.actorRepository.create(createActorDto);
    return this.actorRepository.save(actor);
  }

  findAll() {
    return this.actorRepository.find();
  }

  async findActor(id: number) {
    const actor = await this.actorRepository.findOneBy({ id });

    if (!actor) throw new NotFoundException(`Actor with id: ${id} not found`)

    return actor;
  }

  async updateActor(id: number, updateActorDto: UpdateActorDto) {
    const actor = await this.findActor(id);
    return this.actorRepository.save({ ...actor, ...updateActorDto });
  }

  async removeActor(id: number) {
    const actor = await this.findActor(id);
    return this.actorRepository.remove(actor);
  }
}
