import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    ProfileModule, 
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
