import { Module } from '@nestjs/common';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';

@Module({
  imports: [],
  controllers: [FilterController],
  providers: [FilterService]
})
export class FilterModule {}
