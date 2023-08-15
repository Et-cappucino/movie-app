import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profile/entities/profile.entity";
import { EmailConfirmationToken } from "src/email-confirmation-token/entities/email-confirmation-token.entity";

@Entity()
export class User {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Column()
    password: string;
    
    @ApiProperty()
    @Column({ name: 'is_admin', default: false })
    isAdmin: boolean;

    @ApiProperty()
    @Column({ name: 'is_enabled', default: false })
    isEnabled: boolean;

    @ApiProperty()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiProperty()
    @Column({ name: 'hashed_refresh_token', nullable: true })
    hashedRefreshToken: string;

    @ApiProperty({ type: () => Profile })
    @OneToOne(() => Profile, (profile) => profile.user)
    profile: Profile;

    @ApiProperty({ type: () => EmailConfirmationToken })
    @OneToOne(() => EmailConfirmationToken, (emailConfirmationToken) => emailConfirmationToken.user)
    emailConfirmationToken: EmailConfirmationToken;
}
