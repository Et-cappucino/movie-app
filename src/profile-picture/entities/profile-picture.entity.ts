import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "src/profile/entities/profile.entity";

@Entity()
export class ProfilePicture {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'image_file_name' })
    name: string;

    @Column({ name: 'image_file_type' })
    type: string;

    @CreateDateColumn({ name: 'uploaded_at' })
    uploadedAt: Date;

    @Column({ name: 'image_file_data', type: 'longblob' })
    imageData: Buffer;

    @OneToOne(() => Profile, (profile) => profile.profilePicture, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;
}
