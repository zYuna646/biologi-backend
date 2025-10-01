import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { QuizSession } from '../entities/quiz-session.entity';
import { Answer } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizSession, Answer, Question])],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
