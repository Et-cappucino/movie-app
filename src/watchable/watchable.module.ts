import { Module } from '@nestjs/common';
import { WatchableService, GenreService } from './services';
import { Watchable, Genre } from './entities';
import { WatchableController } from './watchable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Watchable, Genre]),
    PaginationModule
  ],
  controllers: [WatchableController],
  providers: [
    WatchableService, 
    GenreService
  ],
  exports: [WatchableService]
})
export class WatchableModule {}
