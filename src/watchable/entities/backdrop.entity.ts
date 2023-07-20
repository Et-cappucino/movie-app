import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Watchable } from "./watchable.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('backdrops')
export class Backdrop {

    @ApiProperty()
    @PrimaryColumn({ name: 'backdrop_path', type: 'varchar' })
    backdropPath: string;

    @ApiProperty({ type: () => Watchable, isArray: true })
    @ManyToOne(() => Watchable, (watchable) => watchable.backdrops, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'watchable_id' })
    watchable: Watchable;
}