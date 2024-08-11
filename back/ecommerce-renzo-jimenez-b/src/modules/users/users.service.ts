import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.interface';
import { UserDto } from './user.dto';
import { CreateUserDto } from './createUser.dto';
import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';

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
    // const userDto = Object.assign(new CreateUserDto(), createUserDto);
    const userDto = plainToInstance(CreateUserDto, createUserDto);

    try {
      await validateOrReject(userDto);
      return this.usersRepository.createUser(userDto);
    } catch (errors) {
      throw new BadRequestException('Validation failed', errors);
    }
  }

  updateUser(id: number) {
    return this.usersRepository.updateUser(id);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
