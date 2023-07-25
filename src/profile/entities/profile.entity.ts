import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Watchable, Genre } from "src/watchable/entities";
import { ProfilePicture } from "src/profile-picture/entities/profile-picture.entity";

@Entity()
export class Profile {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ name: 'first_name', default: '' })
    firstName: string;

    @ApiProperty()
    @Column({ name: 'last_name', default: '' })
    lastName: string;

    @ApiProperty({ type: () => User })
    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => ProfilePicture, (profilePicture) => profilePicture.profile, { nullable: true })
    profilePicture: ProfilePicture;

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
