import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'birth_date', type: 'date', nullable: true })
    birthDate: Date;

    @Column({ name: 'bio', type: 'text', nullable: true })
    bio: string;

    @Column({ name: 'image_path', nullable: true })
    imagePath: string;
}
