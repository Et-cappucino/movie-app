import { PartialType } from '@nestjs/swagger';
import { CreateWatchableDto } from './create-watchable.dto';

export class UpdateWatchableDto extends PartialType(CreateWatchableDto) {}
