import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profile/entities/profile.entity";

@Entity()
export class SearchRecord {

    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'searched_text' })
    text: string;

    @ApiProperty({ type: () => Profile })
    @ManyToOne(() => Profile, (profile) => profile.searches, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;
}
