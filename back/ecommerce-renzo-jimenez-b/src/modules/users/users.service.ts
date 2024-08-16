import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.interface';
import { UserDto } from '../../dto/UserDto';
import { CreateUserDto } from '../../dto/CreateUserDto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<UserDto[]> {
    return this.usersRepository.getUsers();
  }

  getUserById(id: number): Promise<UserDto> {
    return this.usersRepository.getById(id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const userDto = plainToInstance(CreateUserDto, createUserDto);

    try {
      await validateData(userDto);
      return this.usersRepository.createUser(userDto);
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
