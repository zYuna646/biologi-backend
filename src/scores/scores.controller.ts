import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from '../dto/create-score.dto';
import { UpdateScoreDto } from '../dto/update-score.dto';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Post()
  @ApiOperation({ summary: 'Membuat score baru' })
  @ApiBody({ type: CreateScoreDto })
  @ApiResponse({
    status: 201,
    description: 'Score berhasil dibuat',
  })
  @ApiResponse({
    status: 400,
    description: 'Data input tidak valid',
  })
  create(@Body(ValidationPipe) createScoreDto: CreateScoreDto) {
    return this.scoresService.create(createScoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Mendapatkan semua score' })
  @ApiResponse({
    status: 200,
    description: 'Daftar semua score',
  })
  findAll() {
    return this.scoresService.findAll();
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Mendapatkan leaderboard' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Jumlah maksimal data leaderboard',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Data leaderboard',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          rank: { type: 'number', example: 1 },
          user_id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'John Doe' },
          class: { type: 'string', example: '10A' },
          highest_score: { type: 'number', example: 95 },
          total_games: { type: 'number', example: 5 },
        },
      },
    },
  })
  getLeaderboard(@Query('limit') limit?: string) {
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.scoresService.getLeaderboard(limitNumber);
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: 'Mendapatkan score berdasarkan user ID' })
  @ApiParam({
    name: 'user_id',
    description: 'ID user',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Daftar score user',
  })
  findByUserId(@Param('user_id') user_id: string) {
    return this.scoresService.findByUserId(+user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan score berdasarkan ID' })
  @ApiParam({
    name: 'id',
    description: 'ID score',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Data score ditemukan',
  })
  @ApiResponse({
    status: 404,
    description: 'Score tidak ditemukan',
  })
  findOne(@Param('id') id: string) {
    return this.scoresService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mengupdate data score' })
  @ApiParam({
    name: 'id',
    description: 'ID score',
    example: 1,
  })
  @ApiBody({ type: UpdateScoreDto })
  @ApiResponse({
    status: 200,
    description: 'Score berhasil diupdate',
  })
  @ApiResponse({
    status: 404,
    description: 'Score tidak ditemukan',
  })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateScoreDto: UpdateScoreDto,
  ) {
    return this.scoresService.update(+id, updateScoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus score' })
  @ApiParam({
    name: 'id',
    description: 'ID score',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Score berhasil dihapus',
  })
  @ApiResponse({
    status: 404,
    description: 'Score tidak ditemukan',
  })
  remove(@Param('id') id: string) {
    return this.scoresService.remove(+id);
  }
}
