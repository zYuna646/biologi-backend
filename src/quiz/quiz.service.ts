import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizSession } from '../entities/quiz-session.entity';
import { Answer } from '../entities/answer.entity';
import { Question, QuestionType } from '../entities/question.entity';
import { CreateQuizSessionDto } from '../dto/create-quiz-session.dto';
import {
  SubmitAnswerDto,
  SubmitMultipleAnswersDto,
} from '../dto/submit-answer.dto';
import * as puppeteer from 'puppeteer';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizSession)
    private quizSessionRepository: Repository<QuizSession>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async startQuizSession(
    createQuizSessionDto: CreateQuizSessionDto,
  ): Promise<QuizSession> {
    const quizSession = this.quizSessionRepository.create({
      user_id: createQuizSessionDto.user_id,
      start_time: new Date(),
      total_questions: await this.questionRepository.count(),
    });

    return await this.quizSessionRepository.save(quizSession);
  }

  async submitAnswer(submitAnswerDto: SubmitAnswerDto): Promise<Answer> {
    const { quiz_session_id, question_id, user_answer } = submitAnswerDto;

    // Get quiz session
    const quizSession = await this.quizSessionRepository.findOne({
      where: { id: quiz_session_id },
    });

    if (!quizSession) {
      throw new NotFoundException('Quiz session not found');
    }

    if (quizSession.is_completed) {
      throw new BadRequestException('Quiz session is already completed');
    }

    // Get question
    const question = await this.questionRepository.findOne({
      where: { id: question_id },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    // Check if already answered
    const existingAnswer = await this.answerRepository.findOne({
      where: {
        quiz_session_id,
        question_id,
      },
    });

    if (existingAnswer) {
      throw new BadRequestException('Question already answered');
    }

    // Evaluate answer
    const { isCorrect, pointsEarned } = this.evaluateAnswer(
      question,
      user_answer,
    );

    // Create answer
    const answer = this.answerRepository.create({
      user_id: quizSession.user_id,
      question_id,
      quiz_session_id,
      user_answer,
      is_correct: isCorrect,
      points_earned: pointsEarned,
    });

    return await this.answerRepository.save(answer);
  }

  async submitMultipleAnswers(
    submitMultipleAnswersDto: SubmitMultipleAnswersDto,
  ): Promise<Answer[]> {
    const { quiz_session_id, answers } = submitMultipleAnswersDto;

    const results: Answer[] = [];

    for (const answerData of answers) {
      try {
        const answer = await this.submitAnswer({
          quiz_session_id,
          ...answerData,
        });
        results.push(answer);
      } catch (error) {
        // Continue with other answers even if one fails
        console.error(
          `Failed to submit answer for question ${answerData.question_id}:`,
          error,
        );
      }
    }

    return results;
  }

  async completeQuizSession(sessionId: number): Promise<QuizSession> {
    const quizSession = await this.quizSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['answers'],
    });

    if (!quizSession) {
      throw new NotFoundException('Quiz session not found');
    }

    if (quizSession.is_completed) {
      throw new BadRequestException('Quiz session is already completed');
    }

    // Calculate totals
    const totalScore = quizSession.answers.reduce(
      (sum, answer) => sum + answer.points_earned,
      0,
    );
    const correctAnswers = quizSession.answers.filter(
      (answer) => answer.is_correct,
    ).length;
    const endTime = new Date();
    const durationSeconds = Math.floor(
      (endTime.getTime() - quizSession.start_time.getTime()) / 1000,
    );

    // Update session
    quizSession.end_time = endTime;
    quizSession.total_score = totalScore;
    quizSession.correct_answers = correctAnswers;
    quizSession.duration_seconds = durationSeconds;
    quizSession.is_completed = true;

    return await this.quizSessionRepository.save(quizSession);
  }

  async getQuizHistory(userId: number): Promise<QuizSession[]> {
    return await this.quizSessionRepository.find({
      where: { user_id: userId },
      relations: ['answers', 'answers.question'],
      order: { created_at: 'DESC' },
    });
  }

  async getQuizSessionDetail(sessionId: number): Promise<QuizSession> {
    const session = await this.quizSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['answers', 'answers.question', 'user'],
    });

    if (!session) {
      throw new NotFoundException('Quiz session not found');
    }

    return session;
  }

  async generateQuizPdf(sessionId: number): Promise<Buffer> {
    const session = await this.quizSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['answers', 'answers.question', 'user'],
    });

    if (!session) {
      throw new NotFoundException('Quiz session not found');
    }

    if (!session.is_completed) {
      throw new BadRequestException('Quiz session is not completed yet');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlContent = this.generatePdfHtml(session);

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });

    await browser.close();
    return Buffer.from(pdfBuffer);
  }

  private generatePdfHtml(session: QuizSession): string {
    const wrongAnswers = session.answers.filter(answer => !answer.is_correct);
    const correctAnswersCount = session.answers.filter(answer => answer.is_correct).length;
    const totalQuestions = session.answers.length;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0;

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Quiz Report - ${session.user?.name || 'User'}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                color: #333;
            }
            .header {
                text-align: center;
                border-bottom: 2px solid #007bff;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }
            .header h1 {
                color: #007bff;
                margin: 0;
            }
            .user-info {
                background: #f8f9fa;
                padding: 15px;
                border-radius: 8px;
                margin-bottom: 25px;
            }
            .score-summary {
                background: #e7f3ff;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 25px;
                border-left: 4px solid #007bff;
            }
            .question-item {
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 15px;
                background: white;
            }
            .question-item.correct {
                border-left: 4px solid #28a745;
                background: #f8fff9;
            }
            .question-item.incorrect {
                border-left: 4px solid #dc3545;
                background: #fff8f8;
            }
            .question-text {
                font-weight: bold;
                margin-bottom: 10px;
            }
            .answer-section {
                margin-top: 10px;
            }
            .user-answer {
                color: #dc3545;
                font-weight: bold;
            }
            .correct-answer {
                color: #28a745;
                font-weight: bold;
            }
            .options {
                margin: 10px 0;
            }
            .option {
                margin: 5px 0;
                padding: 5px;
                background: #f8f9fa;
                border-radius: 4px;
            }
            .stats {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
            }
            .stat-item {
                text-align: center;
                flex: 1;
            }
            .stat-number {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Laporan Quiz Biologi</h1>
            <p>Tanggal: ${new Date(session.end_time).toLocaleDateString('id-ID')}</p>
        </div>

        <div class="user-info">
            <h3>Informasi Peserta</h3>
            <p><strong>Nama:</strong> ${session.user?.name || 'N/A'}</p>
            <p><strong>Kelas:</strong> ${session.user?.class || 'N/A'}</p>
            <p><strong>Session ID:</strong> ${session.id}</p>
            <p><strong>Waktu Mulai:</strong> ${new Date(session.start_time).toLocaleString('id-ID')}</p>
            <p><strong>Waktu Selesai:</strong> ${new Date(session.end_time).toLocaleString('id-ID')}</p>
            <p><strong>Durasi:</strong> ${Math.floor(session.duration_seconds / 60)} menit ${session.duration_seconds % 60} detik</p>
        </div>

        <div class="score-summary">
            <h3>Ringkasan Nilai</h3>
            <div class="stats">
                <div class="stat-item">
                    <div class="stat-number">${session.total_score}</div>
                    <div>Total Skor</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${correctAnswersCount}</div>
                    <div>Jawaban Benar</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${wrongAnswers.length}</div>
                    <div>Jawaban Salah</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${percentage}%</div>
                    <div>Persentase</div>
                </div>
            </div>
        </div>

        <h3>Detail Jawaban</h3>
        ${session.answers.map((answer, index) => this.generateQuestionHtml(answer, index + 1)).join('')}
    </body>
    </html>
    `;
  }

  private generateQuestionHtml(answer: Answer, questionNumber: number): string {
    const question = answer.question;
    const isCorrect = answer.is_correct;
    const cssClass = isCorrect ? 'correct' : 'incorrect';

    let optionsHtml = '';
    if (question.question_type === 'PG' && question.options && Array.isArray(question.options)) {
      optionsHtml = `
        <div class="options">
          <strong>Pilihan:</strong><br>
          ${question.options.map((option, index) => 
            `<div class="option">${String.fromCharCode(65 + index)}. ${option}</div>`
          ).join('')}
        </div>
      `;
    }

    const formatAnswer = (ans: any): string => {
      if (Array.isArray(ans)) {
        return ans.join(', ');
      }
      return String(ans || '');
    };

    return `
      <div class="question-item ${cssClass}">
        <div class="question-text">
          Soal ${questionNumber}: ${question.question_text}
        </div>
        
        ${optionsHtml}
        
        <div class="answer-section">
          <p><strong>Jawaban Anda:</strong> 
            <span class="user-answer">${formatAnswer(answer.user_answer)}</span>
          </p>
          
          ${!isCorrect ? `
            <p><strong>Jawaban Benar:</strong> 
              <span class="correct-answer">${formatAnswer(question.correct_answer)}</span>
            </p>
          ` : ''}
          
          <p><strong>Skor:</strong> ${answer.points_earned} / ${question.score}</p>
          <p><strong>Status:</strong> ${isCorrect ? '✅ Benar' : '❌ Salah'}</p>
        </div>
      </div>
    `;
  }

  private evaluateAnswer(
    question: Question,
    userAnswer: string | string[],
  ): { isCorrect: boolean; pointsEarned: number } {
    let isCorrect = false;

    switch (question.question_type) {
      case 'PG': // Pilihan Ganda
        isCorrect = question.correct_answer === userAnswer;
        break;

      case 'IS': // Isian Singkat
        const correctAnswer = (question.correct_answer as string)
          .toLowerCase()
          .trim();
        const userAnswerStr = (userAnswer as string).toLowerCase().trim();
        isCorrect = correctAnswer === userAnswerStr;
        break;

      case 'PGK': // Pilihan Ganda Kompleks
        if (
          Array.isArray(userAnswer) &&
          Array.isArray(question.correct_answer)
        ) {
          isCorrect =
            userAnswer.sort().join(',') ===
            question.correct_answer.sort().join(',');
        }
        break;

      case 'M': // Menjodohkan
        if (
          Array.isArray(userAnswer) &&
          Array.isArray(question.correct_answer)
        ) {
          isCorrect =
            userAnswer.sort().join(',') ===
            question.correct_answer.sort().join(',');
        }
        break;

      case 'U': // Uraian
        // For essay questions, manual evaluation might be needed
        // For now, we'll consider it correct if there's an answer
        isCorrect = (userAnswer as string).trim().length > 10;
        break;
    }

    const pointsEarned = isCorrect ? question.score : 0;
    return { isCorrect, pointsEarned };
  }
}
