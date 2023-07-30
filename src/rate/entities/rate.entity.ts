import { Profile } from "src/profile/entities/profile.entity";
import { Watchable } from "src/watchable/entities";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Rate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'question_one_value', type: 'double' })
    questionOneValue: number;

    @Column({ name: 'question_two_value', type: 'double' })
    questionTwoValue: number;

    @Column({ name: 'question_three_value', type: 'double' })
    questionThreeValue: number;

    @CreateDateColumn({ name: 'rated_at' })
    ratedAt: Date;

    @ManyToOne(() => Profile, (profile) => profile.rates, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @ManyToOne(() => Watchable, (watchable) => watchable.rates, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'watchable_id' })
    watchable: Watchable;
}
