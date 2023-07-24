import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

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
}
