import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat user baru' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User berhasil dibuat',
  })
  @ApiResponse({
    status: 400,
    description: 'Data input tidak valid',
  })
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua user' })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua user',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan user berdasarkan ID' })
  @ApiParam({
    name: 'id',
    description: 'ID user',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Data user ditemukan',
  })
  @ApiResponse({
    status: 404,
    description: 'User tidak ditemukan',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('device/:device_token')
  @ApiOperation({ summary: 'Mendapatkan user berdasarkan device token' })
  @ApiParam({
    name: 'device_token',
    description: 'Token device user',
    example: 'device_123456789',
  })
  @ApiResponse({
    status: 200,
    description: 'Data user ditemukan',
  })
  @ApiResponse({
    status: 404,
    description: 'User dengan device token tersebut tidak ditemukan',
  })
  findByDeviceToken(@Param('device_token') device_token: string) {
    return this.usersService.findByDeviceToken(device_token);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mengupdate data user' })
  @ApiParam({
    name: 'id',
    description: 'ID user',
    example: 1,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'User berhasil diupdate',
  })
  @ApiResponse({
    status: 404,
    description: 'User tidak ditemukan',
  })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus user' })
  @ApiParam({
    name: 'id',
    description: 'ID user',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User berhasil dihapus',
  })
  @ApiResponse({
    status: 404,
    description: 'User tidak ditemukan',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
