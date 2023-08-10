import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

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

    @ApiProperty({ type: () => User })
    @OneToOne(() => User, (user) => user.emailConfirmationToken, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}