import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
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
    @Column({ default: false })
    isAdmin: boolean;

    @ApiProperty({ type: () => Profile })
    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;
}
