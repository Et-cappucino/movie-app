import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @ApiProperty()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    @ApiProperty({ type: () => Profile })
    @ManyToOne(() => Profile, (profile) => profile.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    commenter: Profile;

    @ApiProperty({ type: () => Watchable })
    @ManyToOne(() => Watchable, (watchable) => watchable.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'watchable_id' })
    watchable: Watchable;
}
