import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { WatchableModule } from 'src/watchable/watchable.module';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    ProfileModule,
    WatchableModule,
    PaginationModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
