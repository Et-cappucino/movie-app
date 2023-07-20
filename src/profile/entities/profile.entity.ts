import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Watchable, Genre } from "src/watchable/entities";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Profile {

    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @ApiProperty()
    @Column({ default: '' })
    firstName: string;

    @ApiProperty()
    @Column({ default: '' })
    lastName: string;

    @ApiProperty({ type: () => User })
    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ApiProperty({ type: () => Watchable, isArray: true })
    @ManyToMany(() => Watchable)
    @JoinTable({
        name: 'watchlist', 
        joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'watchable_id', referencedColumnName: 'id' }
    })
    watchlist: Watchable[];

    @ApiProperty({ type: () => Watchable, isArray: true })
    @ManyToMany(() => Watchable)
    @JoinTable({
        name: 'favorites', 
        joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'watchable_id', referencedColumnName: 'id' }
    })
    favorites: Watchable[];

    @ApiProperty({ type: () => Genre, isArray: true })
    @ManyToMany(() => Genre)
    @JoinTable({
        name: 'favorite_genres', 
        joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'genre', referencedColumnName: 'genre' }
    })
    favoriteGenres: Genre[];
}
