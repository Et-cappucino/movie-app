import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { PaginationModule } from 'src/utils/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    PaginationModule
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
