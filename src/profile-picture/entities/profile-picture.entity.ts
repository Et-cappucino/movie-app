import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profile/entities/profile.entity";

@Entity()
export class ProfilePicture {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'image_file_name' })
    name: string;

    @ApiProperty()
    @Column({ name: 'image_file_type' })
    type: string;

    @ApiProperty()
    @CreateDateColumn({ name: 'uploaded_at' })
    uploadedAt: Date;

    @ApiProperty()
    @Column({ name: 'image_file_data', type: 'longblob' })
    imageData: Buffer;

    @ApiProperty({ type: () => Profile })
    @OneToOne(() => Profile, (profile) => profile.profilePicture, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;
}
