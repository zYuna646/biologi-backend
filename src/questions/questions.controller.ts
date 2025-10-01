import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { QuestionsService } from './questions.service';
import { Question, QuestionType } from '../entities/question.entity';
import { QuestionsSeederService } from './questions-seeder.service';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly questionsSeederService: QuestionsSeederService,
  ) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get questions statistics' })
  @ApiResponse({ status: 200, description: 'Questions statistics' })
  async getStats(): Promise<{
    total: number;
    byType: Record<string, number>;
  }> {
    return this.questionsService.getQuestionStats();
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, description: 'List of all questions' })
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Get questions by type' })
  @ApiParam({
    name: 'type',
    enum: QuestionType,
    description: 'Type of question',
  })
  @ApiResponse({ status: 200, description: 'List of questions by type' })
  async findByType(@Param('type') type: QuestionType): Promise<Question[]> {
    return this.questionsService.findByType(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  @ApiParam({ name: 'id', description: 'Question ID' })
  @ApiResponse({ status: 200, description: 'Question details' })
  async findOne(@Param('id') id: number): Promise<Question | null> {
    return this.questionsService.findOne(id);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Clear all questions, answers, and quiz sessions (Development only)' })
  @ApiResponse({ status: 200, description: 'All data cleared successfully' })
  async clearQuestions(): Promise<{ message: string; deletedCount: number }> {
    const deletedCount = await this.questionsService.clearAllQuestions();
    return {
      message: 'All questions, answers, and quiz sessions cleared successfully',
      deletedCount,
    };
  }

  @Post('seed')
  @ApiOperation({ summary: 'Seed questions (clears existing first)' })
  @ApiResponse({ status: 201, description: 'Questions seeded successfully' })
  async seedQuestions(): Promise<{ message: string; count: number }> {
    // Clear existing questions first to prevent duplicates
    const deletedCount = await this.questionsService.clearAllQuestions();
    
    // Seed new questions
    await this.questionsSeederService.seedAllQuestions();
    const questions = await this.questionsService.findAll();
    
    return {
      message: `Questions seeded successfully. Deleted ${deletedCount} old questions.`,
      count: questions.length,
    };
  }

  @Post('seed-safe')
  @ApiOperation({ summary: 'Safe seed (only if database is empty)' })
  @ApiResponse({ status: 201, description: 'Questions seeded successfully or skipped if exists' })
  async safeSeedQuestions(): Promise<{ message: string; count: number }> {
    const existingCount = (await this.questionsService.findAll()).length;
    
    if (existingCount > 0) {
      return {
        message: `Seeding skipped. ${existingCount} questions already exist.`,
        count: existingCount,
      };
    }
    
    await this.questionsSeederService.seedAllQuestions();
    const questions = await this.questionsService.findAll();
    
    return {
      message: 'Questions seeded successfully',
      count: questions.length,
    };
  }
}
