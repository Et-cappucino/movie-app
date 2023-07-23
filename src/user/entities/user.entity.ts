import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from "typeorm";
import { Profile } from "src/profile/entities/profile.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;
    
    @ApiProperty()
    @Column({ name: 'is_admin', default: false })
    isAdmin: boolean;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty({ type: () => Profile })
    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;
}
