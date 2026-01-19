import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Device token for the user' })
  @IsNotEmpty()
  @IsString()
  device_token: string;

  @ApiProperty({ description: 'Name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Class of the user' })
  @IsNotEmpty()
  @IsString()
  class: string;

  @ApiProperty({ description: 'NISN (Nomor Induk Siswa Nasional)', required: false })
  @IsOptional()
  @IsString()
  @Length(10, 10, { message: 'NISN must be exactly 10 characters long' })
  nisn?: string;
}
