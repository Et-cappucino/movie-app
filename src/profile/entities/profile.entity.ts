import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: '' })
    firstName: string;

    @Column({ default: '' })
    lastName: string;

    @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;
}
