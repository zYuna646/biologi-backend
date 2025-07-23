import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Answer } from './answer.entity';

@Entity('quiz_sessions')
export class QuizSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date;

  @Column({ type: 'integer', nullable: true })
  total_score: number;

  @Column({ type: 'integer', nullable: true })
  total_questions: number;

  @Column({ type: 'integer', nullable: true })
  correct_answers: number;

  @Column({ type: 'integer', nullable: true })
  duration_seconds: number;

  @Column({ type: 'boolean', default: false })
  is_completed: boolean;

  @ManyToOne(() => User, (user) => user.scores)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Answer, (answer) => answer.quiz_session)
  answers: Answer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
