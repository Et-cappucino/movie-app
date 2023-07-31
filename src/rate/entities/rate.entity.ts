import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/profile/entities/profile.entity";
import { Watchable } from "src/watchable/entities";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Rate {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ name: 'question_one_value', type: 'double' })
    questionOneValue: number;

    @ApiProperty()
    @Column({ name: 'question_two_value', type: 'double' })
    questionTwoValue: number;

    @ApiProperty()
    @Column({ name: 'question_three_value', type: 'double' })
    questionThreeValue: number;

    @ApiProperty()
    @CreateDateColumn({ name: 'rated_at' })
    ratedAt: Date;

    @ApiProperty({ type: () => Profile })
    @ManyToOne(() => Profile, (profile) => profile.rates, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @ApiProperty({ type: () => Watchable })
    @ManyToOne(() => Watchable, (watchable) => watchable.rates, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'watchable_id' })
    watchable: Watchable;
}
