import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "src/profile/entities/profile.entity";

@Entity()
export class SearchRecord {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @Column({ name: 'searched_text' })
    text: string;

    @ManyToOne(() => Profile, (profile) => profile.searches, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;
}
