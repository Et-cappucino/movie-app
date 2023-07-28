import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { ActorModule } from 'src/actor/actor.module';
import { WatchableModule } from 'src/watchable/watchable.module';

@Module({
  imports: [
    ActorModule,
    WatchableModule
  ],
  controllers: [CastController],
  providers: [CastService]
})
export class CastModule {}
