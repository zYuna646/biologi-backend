import { IsDateString, IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreDto {
  @ApiProperty({
    description: 'Tanggal permainan',
    example: '2025-01-22',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Skor yang diperoleh',
    example: 85,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    description: 'Level permainan',
    example: 'Easy',
    enum: ['Easy', 'Medium', 'Hard'],
  })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    description: 'ID pengguna yang bermain',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
