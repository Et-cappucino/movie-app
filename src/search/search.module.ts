import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchRecord } from './entities/search-record.entity';
import { UserModule } from 'src/user/user.module';
import { Watchable } from 'src/watchable/entities';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchRecord, Watchable]),
    UserModule,
    PaginationModule
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
