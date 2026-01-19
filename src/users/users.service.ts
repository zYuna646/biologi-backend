import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Not } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if device token already exists
    const existingDeviceToken = await this.usersRepository.findOne({
      where: { device_token: createUserDto.device_token },
    });

    if (existingDeviceToken) {
      throw new ConflictException('Device token already in use');
    }

    // Check if NISN already exists if provided
    if (createUserDto.nisn) {
      const existingNisn = await this.usersRepository.findOne({
        where: { nisn: createUserDto.nisn },
      });

      if (existingNisn) {
        throw new ConflictException('NISN already in use');
      }
    }

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['scores'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['scores'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByDeviceToken(device_token: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { device_token },
      relations: ['scores'],
    });

    if (!user) {
      throw new NotFoundException(
        `User with device token ${device_token} not found`,
      );
    }

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if NISN already exists if provided
    if (updateUserDto.nisn) {
      const existingNisn = await this.usersRepository.findOne({
        where: { nisn: updateUserDto.nisn, id: Not(id) },
      });

      if (existingNisn) {
        throw new ConflictException('NISN already in use by another user');
      }
    }

    // Merge the update DTO with existing user
    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
