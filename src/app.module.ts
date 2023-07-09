import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), ProfileModule, ],
  controllers: [],
  providers: [],
})
export class AppModule {}
