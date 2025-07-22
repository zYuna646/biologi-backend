import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Token unik device pengguna',
    example: 'device_123456789',
  })
  @IsString()
  @IsOptional()
  device_token?: string;

  @ApiPropertyOptional({
    description: 'Nama lengkap pengguna',
    example: 'Jane Doe',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Kelas pengguna',
    example: '10B',
  })
  @IsString()
  @IsOptional()
  class?: string;
}
