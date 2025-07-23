import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { QuizSession } from './quiz-session.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  question_id: number;

  @Column()
  quiz_session_id: number;

  // User's answer - can be string or array for complex questions
  @Column({ type: 'json' })
  user_answer: string | string[];

  @Column({ type: 'boolean' })
  is_correct: boolean;

  @Column({ type: 'integer' })
  points_earned: number;

  @ManyToOne(() => User, (user) => user.scores)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => QuizSession, (session) => session.answers)
  @JoinColumn({ name: 'quiz_session_id' })
  quiz_session: QuizSession;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
