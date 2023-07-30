import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWatchableDto, UpdateWatchableDto } from '../dto';
import { Watchable } from '../entities';
import { PaginationService } from 'src/utils/pagination/pagaination.service';

@Injectable()
export class WatchableService {
  constructor(
    @InjectRepository(Watchable)
    private readonly watchableRepository: Repository<Watchable>,
    private readonly paginationService: PaginationService
  ) {}

  save(watchable: Watchable) {
    return this.watchableRepository.save(watchable);
  } 

  create(createWatchableDto: CreateWatchableDto) {
    const watchable = this.watchableRepository.create(createWatchableDto)
    return this.save(watchable);
  }

  async findAll(pageNumber: number, pageSize: number) {
    const [watchables, count] = await this.watchableRepository.findAndCount({
      skip: pageNumber * pageSize,
      take: pageSize
    });

    return this.paginationService.paginate(watchables, pageNumber, pageSize, count);
  }

  async findOne(id: number) {
    const watchable = await this.watchableRepository.findOne({
      where: { id },
      relations: {
        genres: true,
        backdrops: true,
        cast: true,
        comments: true
      }
    });
    
    if (!watchable) throw new NotFoundException(`Watchable with id: ${id} not found`)

    return watchable;
  }

  async update(id: number, updateWatchableDto: UpdateWatchableDto) {
    const watchable = await this.findOne(id)
    return this.save({ ...watchable, ...updateWatchableDto });
  }

  async remove(id: number) {
    const watchable = await this.findOne(id)
    return this.watchableRepository.remove(watchable);
  }
}
