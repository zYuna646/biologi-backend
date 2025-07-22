import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Token unik device pengguna',
    example: 'device_123456789',
  })
  @IsString()
  @IsNotEmpty()
  device_token: string;

  @ApiProperty({
    description: 'Nama lengkap pengguna',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Kelas pengguna',
    example: '10A',
  })
  @IsString()
  @IsNotEmpty()
  class: string;
}
