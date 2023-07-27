import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Actor {

    @ApiProperty()
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ApiProperty()
    @Column({ name: 'first_name' })
    firstName: string;

    @ApiProperty()
    @Column({ name: 'last_name' })
    lastName: string;

    @ApiProperty({ required: false })
    @Column({ name: 'birth_date', type: 'date', nullable: true })
    birthDate: Date;

    @ApiProperty({ required: false })
    @Column({ name: 'bio', type: 'text', nullable: true })
    bio: string;

    @ApiProperty({ required: false })
    @Column({ name: 'image_path', nullable: true })
    imagePath: string;
}
