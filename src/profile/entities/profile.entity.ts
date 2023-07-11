import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: '' })
    firstName: String;

    @Column({ default: '' })
    lastName: String;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}
