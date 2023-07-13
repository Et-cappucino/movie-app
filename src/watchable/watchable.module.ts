import { Module } from '@nestjs/common';
import { WatchableService } from './watchable.service';
import { WatchableController } from './watchable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watchable } from './entities/watchable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Watchable])],
  controllers: [WatchableController],
  providers: [WatchableService]
})
export class WatchableModule {}
