import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { Watchable } from "./watchable.entity";

@Entity('backdrops')
export class Backdrop {

    @PrimaryColumn({ name: 'backdrop_path', type: 'varchar' })
    backdropPath: string;

    @ManyToOne(() => Watchable, (watchable) => watchable.backdrops, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'watchable_id' })
    watchable: Watchable;
}