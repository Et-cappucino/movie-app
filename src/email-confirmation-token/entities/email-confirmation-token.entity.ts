import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class EmailConfirmationToken {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    token: string;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'expires_at', type: 'datetime' })
    expiresAt: Date;

    @ApiProperty()
    @Column({ name: 'confirmed_at', type: 'datetime', nullable: true })
    confirmedAt: Date;
}