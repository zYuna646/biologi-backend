import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from '../entities/score.entity';
import { CreateScoreDto } from '../dto/create-score.dto';
import { UpdateScoreDto } from '../dto/update-score.dto';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: Repository<Score>,
  ) {}

  async create(createScoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoresRepository.create({
      ...createScoreDto,
      date: new Date(createScoreDto.date),
    });
    return await this.scoresRepository.save(score);
  }

  async findAll(): Promise<Score[]> {
    return await this.scoresRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Score> {
    const score = await this.scoresRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!score) {
      throw new NotFoundException(`Score with ID ${id} not found`);
    }

    return score;
  }

  async findByUserId(user_id: number): Promise<Score[]> {
    return await this.scoresRepository.find({
      where: { user_id },
      relations: ['user'],
      order: { date: 'DESC' },
    });
  }

  async update(id: number, updateScoreDto: UpdateScoreDto): Promise<Score> {
    const score = await this.findOne(id);

    if (updateScoreDto.date) {
      updateScoreDto.date = new Date(updateScoreDto.date).toISOString();
    }

    Object.assign(score, updateScoreDto);
    return await this.scoresRepository.save(score);
  }

  async remove(id: number): Promise<void> {
    const score = await this.findOne(id);
    await this.scoresRepository.remove(score);
  }

  async getLeaderboard(limit: number = 10): Promise<any[]> {
    const result = await this.scoresRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.user', 'user')
      .select([
        'user.id',
        'user.name',
        'user.class',
        'MAX(score.score) as highest_score',
        'COUNT(score.id) as total_games',
      ])
      .groupBy('user.id, user.name, user.class')
      .orderBy('highest_score', 'DESC')
      .limit(limit)
      .getRawMany();

    return result.map((item, index) => ({
      rank: index + 1,
      user_id: item.user_id,
      name: item.user_name,
      class: item.user_class,
      highest_score: parseInt(item.highest_score),
      total_games: parseInt(item.total_games),
    }));
  }
}
