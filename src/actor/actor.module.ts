import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { Actor } from './entities/actor.entity';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Actor]),
    PaginationModule
  ],
  controllers: [ActorController],
  providers: [ActorService]
})
export class ActorModule {}
