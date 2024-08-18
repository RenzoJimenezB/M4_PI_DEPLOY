import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    return this.usersRepository.findOneById(id);
  }

  async createUser(user: CreateUserDto) {
    const userDto = plainToInstance(CreateUserDto, user);

    try {
      await validateData(userDto);
      return this.usersRepository.create(userDto);
    } catch (error) {
      throw error;
    }
  }

  updateUser(id: number) {
    return this.usersRepository.updateUser(id);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
