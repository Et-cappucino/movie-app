import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'text' })
    text: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
