import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchableDto, UpdateWatchableDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Watchable } from './entities/watchable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchableService {
  constructor(
    @InjectRepository(Watchable)
    private readonly watchableRepository: Repository<Watchable>
  ) {}

  create(createWatchableDto: CreateWatchableDto) {
    const watchable = this.watchableRepository.create(createWatchableDto)
    return this.watchableRepository.save(watchable);
  }

  findAll() {
    return this.watchableRepository.find();
  }

  async findOne(id: number) {
    const watchable = await this.watchableRepository.findOneBy({ id });
    
    if (!watchable) throw new NotFoundException(`Watchable with id: ${id} not found`)

    return watchable;
  }

  async update(id: number, updateWatchableDto: UpdateWatchableDto) {
    const watchable = await this.findOne(id)
    return this.watchableRepository.save({ ...watchable, ...updateWatchableDto });
  }

  async remove(id: number) {
    const watchable = await this.findOne(id)
    return this.watchableRepository.remove(watchable);
  }
}
