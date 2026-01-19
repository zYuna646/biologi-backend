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
  Res,
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
import { Score } from '../entities/score.entity';
import { Response } from 'express';
import * as moment from 'moment';

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

  @Get('download-excel')
  @ApiOperation({ summary: 'Download scores as Excel file' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date for filtering scores (ISO date string)'
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date for filtering scores (ISO date string)'
  })
  @ApiResponse({
    status: 200,
    description: 'Excel file with scores',
    headers: {
      'Content-Type': {
        description: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      'Content-Disposition': {
        description: 'attachment; filename="scores_report.xlsx"',
      },
    },
  })
  async downloadScoresExcel(
    @Query('startDate') startDateStr?: string,
    @Query('endDate') endDateStr?: string,
    @Res() res: Response,
  ): Promise<void> {
    // Parse dates if provided
    const startDate = startDateStr ? new Date(startDateStr) : undefined;
    const endDate = endDateStr ? new Date(endDateStr) : undefined;

    // Generate Excel buffer
    const excelBuffer = await this.scoresService.generateScoresExcel(
      startDate,
      endDate
    );

    // Set response headers
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="scores_report_${moment().format('YYYYMMDD_HHmmss')}.xlsx"`,
      'Content-Length': excelBuffer.length.toString(),
    });

    // Send Excel file
    res.send(excelBuffer);
  }

  @Get()
  @ApiOperation({ summary: 'Get all scores with optional date filtering' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Start date for filtering scores (ISO date string)'
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'End date for filtering scores (ISO date string)'
  })
  @ApiResponse({
    status: 200,
    description: 'List of scores',
    type: [Score]
  })
  async getScores(
    @Query('startDate') startDateStr?: string,
    @Query('endDate') endDateStr?: string,
  ): Promise<Score[]> {
    // Parse dates if provided
    const startDate = startDateStr ? new Date(startDateStr) : undefined;
    const endDate = endDateStr ? new Date(endDateStr) : undefined;

    return this.scoresService.getScores(startDate, endDate);
  }
}
