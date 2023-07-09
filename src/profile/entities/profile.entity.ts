import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: String;

    @Column()
    lastName: String;

    @Column()
    email: String;

    @Column()
    password: String;
    
    @Column()
    isAdmin: boolean;
}
