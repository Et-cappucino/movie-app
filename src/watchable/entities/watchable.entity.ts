import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { WatchableType } from "../enums";
import { Genre } from "./genre.entity";

@Entity()
export class Watchable {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ name: 'name' })
    title: string; 

    @Column({ name: 'type', type: 'varchar', enumName: 'WatchableType' })
    type: WatchableType;

    @Column({ name: 'release_date', type: 'date', nullable: true })
    releaseDate: Date;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({ name: 'trailer_link', nullable: true })
    trailerLink: string;

    @Column({ name: 'rating', type: 'double' })
    rating: number;

    @Column({ name: 'vote_count' })
    voteCount: number;

    @Column({ name: 'duration' })
    duration: number;

    @Column({ name: 'poster_path', nullable: true })
    posterPath: string;

    @Column({ name: 'main_backdrop_path', nullable: true })
    mainBackdropPath: string;

    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'genres',
        joinColumn: { name: 'watchable_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'genre', referencedColumnName: 'genre' }
    })
    genres: Genre[];
}
