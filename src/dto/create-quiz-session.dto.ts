import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizSessionDto {
  @ApiProperty({
    description: 'ID pengguna yang memulai kuis',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
