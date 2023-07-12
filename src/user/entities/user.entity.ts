import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Profile } from "src/profile/entities/profile.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
    
    @Column({ default: false })
    isAdmin: boolean;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;
}
