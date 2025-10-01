import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { QuestionsSeederService } from './questions-seeder.service';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { QuizSession } from '../entities/quiz-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, QuizSession])],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionsSeederService],
  exports: [QuestionsService, QuestionsSeederService],
})
export class QuestionsModule {}
