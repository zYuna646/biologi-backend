import { IsDateString, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateScoreDto {
  @ApiPropertyOptional({
    description: 'Tanggal permainan',
    example: '2025-01-22',
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({
    description: 'Skor yang diperoleh',
    example: 90,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  score?: number;

  @ApiPropertyOptional({
    description: 'Level permainan',
    example: 'Medium',
    enum: ['Easy', 'Medium', 'Hard'],
  })
  @IsString()
  @IsOptional()
  level?: string;

  @ApiPropertyOptional({
    description: 'ID pengguna yang bermain',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;
}
