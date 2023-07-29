import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "src/profile/entities/profile.entity";
import { Watchable } from "src/watchable/entities";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'text' })
    text: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @ManyToOne(() => Profile, (profile) => profile.comments)
    @JoinColumn({ name: 'profile_id' })
    commenter: Profile;

    @ManyToOne(() => Watchable, (watchable) => watchable.comments)
    @JoinColumn({ name: 'watchable_id' })
    watchable: Watchable;
}
