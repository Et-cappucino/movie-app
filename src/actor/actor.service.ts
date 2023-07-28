import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto, UpdateActorDto } from './dto';
import { Actor } from './entities/actor.entity';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
    private readonly paginationService: PaginationService
  ){}

  registerActor(createActorDto: CreateActorDto) {
    const actor = this.actorRepository.create(createActorDto);
    return this.actorRepository.save(actor);
  }

  async findAll(pageNumber: number, pageSize: number) {
    const [actors, count] = await this.actorRepository.findAndCount({
      skip: pageNumber * pageSize,
      take: pageSize
    });

    return this.paginationService.paginate(actors, pageNumber, pageSize, count);
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
