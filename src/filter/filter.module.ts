import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { Watchable } from 'src/watchable/entities';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Watchable]),
    PaginationModule
  ],
  controllers: [FilterController],
  providers: [FilterService]
})
export class FilterModule {}
