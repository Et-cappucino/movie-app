import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './db/database.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { WatchableModule } from './watchable/watchable.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    ProfileModule, 
    DatabaseModule, 
    UserModule, 
    WatchableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
