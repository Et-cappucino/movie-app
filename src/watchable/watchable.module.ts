import { Module } from '@nestjs/common';
import { WatchableService, GenreService } from './services';
import { Watchable, Genre } from './entities';
import { WatchableController } from './watchable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Watchable, Genre])],
  controllers: [WatchableController],
  providers: [
    WatchableService, 
    GenreService
  ]
})
export class WatchableModule {}
