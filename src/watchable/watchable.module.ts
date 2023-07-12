import { Module } from '@nestjs/common';
import { WatchableService } from './watchable.service';
import { WatchableController } from './watchable.controller';

@Module({
  controllers: [WatchableController],
  providers: [WatchableService]
})
export class WatchableModule {}
