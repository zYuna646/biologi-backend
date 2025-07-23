import { Controller, Get, Post, Body, Param, Patch, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizSessionDto } from '../dto/create-quiz-session.dto';
import {
  SubmitAnswerDto,
  SubmitMultipleAnswersDto,
} from '../dto/submit-answer.dto';
import { QuizSession } from '../entities/quiz-session.entity';
import { Answer } from '../entities/answer.entity';
import { Response } from 'express';

@ApiTags('quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a new quiz session' })
  @ApiBody({ type: CreateQuizSessionDto })
  @ApiResponse({
    status: 201,
    description: 'Quiz session started successfully',
  })
  async startQuizSession(
    @Body() createQuizSessionDto: CreateQuizSessionDto,
  ): Promise<QuizSession> {
    return this.quizService.startQuizSession(createQuizSessionDto);
  }

  @Post('answer')
  @ApiOperation({ summary: 'Submit an answer to a question' })
  @ApiBody({ type: SubmitAnswerDto })
  @ApiResponse({ status: 201, description: 'Answer submitted successfully' })
  async submitAnswer(
    @Body() submitAnswerDto: SubmitAnswerDto,
  ): Promise<Answer> {
    return this.quizService.submitAnswer(submitAnswerDto);
  }

  @Post('answers')
  @ApiOperation({ summary: 'Submit multiple answers' })
  @ApiBody({ type: SubmitMultipleAnswersDto })
  @ApiResponse({ status: 201, description: 'Answers submitted successfully' })
  async submitMultipleAnswers(
    @Body() submitMultipleAnswersDto: SubmitMultipleAnswersDto,
  ): Promise<Answer[]> {
    return this.quizService.submitMultipleAnswers(submitMultipleAnswersDto);
  }

  @Patch('complete/:sessionId')
  @ApiOperation({ summary: 'Complete a quiz session' })
  @ApiParam({ name: 'sessionId', description: 'Quiz session ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz session completed successfully',
  })
  async completeQuizSession(
    @Param('sessionId') sessionId: number,
  ): Promise<QuizSession> {
    return this.quizService.completeQuizSession(sessionId);
  }

  @Get('history/:userId')
  @ApiOperation({ summary: 'Get quiz history for a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User quiz history' })
  async getQuizHistory(
    @Param('userId') userId: number,
  ): Promise<QuizSession[]> {
    return this.quizService.getQuizHistory(userId);
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Get quiz session details' })
  @ApiParam({ name: 'sessionId', description: 'Quiz session ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz session details with answers',
  })
  async getQuizSessionDetail(
    @Param('sessionId') sessionId: number,
  ): Promise<QuizSession> {
    return this.quizService.getQuizSessionDetail(sessionId);
  }

  @Get('download-pdf/:sessionId')
  @ApiOperation({ summary: 'Download quiz session details as PDF' })
  @ApiParam({ name: 'sessionId', description: 'Quiz session ID' })
  @ApiResponse({
    status: 200,
    description: 'PDF file containing quiz session details',
    headers: {
      'Content-Type': {
        description: 'application/pdf',
      },
      'Content-Disposition': {
        description: 'attachment; filename="quiz-report.pdf"',
      },
    },
  })
  async downloadQuizPdf(
    @Param('sessionId') sessionId: number,
    @Res() res: Response,
  ): Promise<void> {
    const pdfBuffer = await this.quizService.generateQuizPdf(sessionId);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="quiz-report-${sessionId}.pdf"`,
      'Content-Length': pdfBuffer.length.toString(),
    });

    res.send(pdfBuffer);
  }
}
