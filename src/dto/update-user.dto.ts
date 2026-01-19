import { IsString, IsOptional, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Name of the user' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Class of the user' })
  @IsOptional()
  @IsString()
  class?: string;

  @ApiPropertyOptional({ description: 'NISN (Nomor Induk Siswa Nasional)' })
  @IsOptional()
  @IsString()
  @Length(10, 10, { message: 'NISN must be exactly 10 characters long' })
  nisn?: string;
}
