import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Question,
  QuestionType,
} from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { QuizSession } from '../entities/quiz-session.entity';
import { QuestionsSeederService } from './questions-seeder.service';

@Injectable()
export class QuestionsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    @InjectRepository(QuizSession)
    private quizSessionsRepository: Repository<QuizSession>,
    private questionsSeederService: QuestionsSeederService,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.questionsRepository.count();
    if (count === 0) {
      await this.questionsSeederService.seedAllQuestions();
    }
  }

  async findAll(): Promise<Question[]> {
    return await this.questionsRepository.find({
      order: { question_number: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Question | null> {
    return await this.questionsRepository.findOne({
      where: { id },
    });
  }

  async findByType(type: QuestionType): Promise<Question[]> {
    return await this.questionsRepository.find({
      where: { question_type: type },
      order: { question_number: 'ASC' },
    });
  }

  async clearAllQuestions(): Promise<number> {
    const questions = await this.questionsRepository.find();
    const count = questions.length;
    
    if (count > 0) {
      // Delete related data first (foreign key constraints)
      console.log('Clearing answers and quiz sessions...');
      
      // Use raw SQL to delete in correct order
      await this.questionsRepository.query('DELETE FROM answers');
      await this.questionsRepository.query('DELETE FROM quiz_sessions');
      await this.questionsRepository.query('DELETE FROM questions');
      
      console.log(`Successfully cleared ${count} questions and all related data.`);
    }
    
    return count;
  }

  async getQuestionStats(): Promise<{
    total: number;
    byType: Record<string, number>;
  }> {
    const questions = await this.findAll();
    const byType: Record<string, number> = {};
    
    questions.forEach(question => {
      byType[question.question_type] = (byType[question.question_type] || 0) + 1;
    });
    
    return {
      total: questions.length,
      byType,
    };
  }
}
