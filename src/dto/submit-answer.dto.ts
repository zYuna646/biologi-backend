import { IsNumber, IsNotEmpty, IsArray, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitAnswerDto {
  @ApiProperty({
    description: 'ID sesi kuis',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  quiz_session_id: number;

  @ApiProperty({
    description: 'ID pertanyaan',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  question_id: number;

  @ApiProperty({
    description:
      'Jawaban pengguna - bisa string atau array untuk pertanyaan kompleks',
    example: 'A',
  })
  @ValidateIf((obj) => !Array.isArray(obj.user_answer))
  @IsNotEmpty()
  user_answer: string | string[];
}

export class SubmitMultipleAnswersDto {
  @ApiProperty({
    description: 'ID sesi kuis',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  quiz_session_id: number;

  @ApiProperty({
    description: 'Array jawaban untuk multiple pertanyaan',
    type: [SubmitAnswerDto],
  })
  @IsArray()
  @IsNotEmpty()
  answers: Omit<SubmitAnswerDto, 'quiz_session_id'>[];
}
