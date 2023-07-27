import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';

@Module({
  imports: [],
  controllers: [CastController],
  providers: [CastService]
})
export class CastModule {}
