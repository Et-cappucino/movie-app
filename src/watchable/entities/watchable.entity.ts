import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { WatchableType } from "../enums";
import { Genre } from "./genre.entity";
import { Backdrop } from "./backdrop.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Actor } from "src/actor/entities/actor.entity";
import { Comment } from "src/comment/entities/comment.entity";

@Entity()
export class Watchable {

    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ApiProperty()
    @Column({ name: 'name' })
    title: string; 

    @ApiProperty()
    @Column({ name: 'type', type: 'varchar', enumName: 'WatchableType' })
    type: WatchableType;

    @ApiProperty({ required: false })
    @Column({ name: 'release_date', type: 'date', nullable: true })
    releaseDate: Date;

    @ApiProperty()
    @Column({ name: 'description', type: 'text' })
    description: string;

    @ApiProperty({ required: false })
    @Column({ name: 'trailer_link', nullable: true })
    trailerLink: string;

    @ApiProperty()
    @Column({ name: 'rating', type: 'double' })
    rating: number;

    @ApiProperty()
    @Column({ name: 'vote_count' })
    voteCount: number;

    @ApiProperty()
    @Column({ name: 'duration' })
    duration: number;

    @ApiProperty({ required: false })
    @Column({ name: 'poster_path', nullable: true })
    posterPath: string;

    @ApiProperty({ required: false })
    @Column({ name: 'main_backdrop_path', nullable: true })
    mainBackdropPath: string;

    @ApiProperty({ type: () => Genre, isArray: true })
    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'genres',
        joinColumn: { name: 'watchable_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'genre', referencedColumnName: 'genre' }
    })
    genres: Genre[];

    @ApiProperty({ type: () => Actor, isArray: true })
    @ManyToMany(() => Actor)
    @JoinTable({
        name: 'cast',
        joinColumn: { name: 'watchable_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'actor_id', referencedColumnName: 'id' }
    })
    cast: Actor[];

    @ApiProperty({ type: () => Backdrop, isArray: true })
    @OneToMany(() => Backdrop, (backdrop) => backdrop.watchable)
    backdrops: Backdrop[];

    @OneToMany(() => Comment, (comment) => comment.watchable)
    comments: Comment[];
}
