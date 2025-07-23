import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Answer } from './answer.entity';

export enum QuestionType {
  PG = 'PG', // Pilihan Ganda
  PGK = 'PGK', // Pilihan Ganda Kompleks
  IS = 'IS', // Isian Singkat
  M = 'M', // Menjodohkan
  U = 'U', // Uraian
}

export enum CognitiveLevel {
  C1 = 'C1',
  C2 = 'C2',
  C3 = 'C3',
  C4 = 'C4',
  C5 = 'C5',
  C6 = 'C6',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  question_text: string;

  @Column({ type: 'enum', enum: QuestionType })
  question_type: QuestionType;

  @Column()
  question_number: number;

  @Column({ type: 'enum', enum: CognitiveLevel })
  cognitive_level: CognitiveLevel;

  @Column({ type: 'integer' })
  weight: number;

  @Column({ type: 'integer' })
  score: number;

  // For multiple choice questions (PG, PGK)
  @Column({ type: 'json', nullable: true })
  options: string[] | null;

  // For correct answers - can be string or array
  @Column({ type: 'json' })
  correct_answer: string | string[];

  // For matching questions (M) - stores matching pairs
  @Column({ type: 'json', nullable: true })
  matching_pairs: { [key: string]: string } | null;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
