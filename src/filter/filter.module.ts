import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { Watchable } from 'src/watchable/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Watchable])],
  controllers: [FilterController],
  providers: [FilterService]
})
export class FilterModule {}
