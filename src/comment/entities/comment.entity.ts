import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profile/entities/profile.entity";
import { Watchable } from "src/watchable/entities";

@Entity()
export class Comment {

    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ApiProperty()
    @Column({ type: 'text' })
    text: string;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @ApiProperty({ type: () => Profile })
    @ManyToOne(() => Profile, (profile) => profile.comments)
    @JoinColumn({ name: 'profile_id' })
    commenter: Profile;

    @ApiProperty({ type: () => Watchable })
    @ManyToOne(() => Watchable, (watchable) => watchable.comments)
    @JoinColumn({ name: 'watchable_id' })
    watchable: Watchable;
}
