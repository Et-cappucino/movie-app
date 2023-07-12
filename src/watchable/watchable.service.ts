import { Injectable } from '@nestjs/common';
import { CreateWatchableDto, UpdateWatchableDto } from './dto';

@Injectable()
export class WatchableService {
  create(createWatchableDto: CreateWatchableDto) {
    return 'This action adds a new watchable';
  }

  findAll() {
    return `This action returns all watchable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} watchable`;
  }

  update(id: number, updateWatchableDto: UpdateWatchableDto) {
    return `This action updates a #${id} watchable`;
  }

  remove(id: number) {
    return `This action removes a #${id} watchable`;
  }
}
