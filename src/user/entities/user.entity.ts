import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Profile } from "src/profile/entities/profile.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: String;

    @Column()
    password: String;
    
    @Column({ default: false })
    isAdmin: boolean;

    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;
}
