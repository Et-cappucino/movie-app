import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWatchableDto, UpdateWatchableDto } from '../dto';
import { Watchable } from '../entities';
import { Page } from 'src/utils/types/page.interface';

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

  async findAll(pageNumber: number, pageSize: number) {
    const watchables = await this.watchableRepository.find({
      relations: {
        genres: true,
        backdrops: true
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize
    });
    
    return this.getPage(watchables, pageSize);
  }

  async findOne(id: number) {
    const watchable = await this.watchableRepository.findOne({
      where: { id },
      relations: {
        genres: true,
        backdrops: true
      }
    });
    
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

  private async getPage(content: Watchable[], pageSize: number) {
    const totalElements = await this.watchableRepository.count()

    const page: Page = {
      numberOfElements: content.length,
      totalPages: Math.ceil(totalElements / pageSize),
      totalElements,
      content
    }
    return page
  }
}
