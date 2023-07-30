import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

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
}
