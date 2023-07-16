import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Watchable } from "src/watchable/entities";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ default: '' })
    firstName: string;

    @Column({ default: '' })
    lastName: string;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @ManyToMany(() => Watchable)
    @JoinTable({
        name: 'watchlist', 
        joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'watchable_id', referencedColumnName: 'id' }
    })
    watchlist: Watchable[];

    @ManyToMany(() => Watchable)
    @JoinTable({
        name: 'favorites', 
        joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'watchable_id', referencedColumnName: 'id' }
    })
    favorites: Watchable[];
}
