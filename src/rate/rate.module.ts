import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateService } from './rate.service';
import { RateController } from './rate.controller';
import { Rate } from './entities/rate.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { WatchableModule } from 'src/watchable/watchable.module';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rate]),
    ProfileModule,
    WatchableModule,
    PaginationModule
  ],
  controllers: [RateController],
  providers: [RateService]
})
export class RateModule {}
