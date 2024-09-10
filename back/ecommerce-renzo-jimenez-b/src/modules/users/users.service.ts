import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';
import { PublicUserDto } from './dto/public-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminUserDto } from './dto/admin-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(): Promise<AdminUserDto[]> {
    const users = await this.usersRepository.findAll();
    return plainToInstance(AdminUserDto, users);
  }

  async getUserById(id: string): Promise<PublicUserDto> {
    const user = await this.usersRepository.findOneById(id);
    return plainToInstance(PublicUserDto, user);
  }

  async createUser(user: CreateUserDto): Promise<PublicUserDto> {
    const newUser = this.usersRepository.create(user);
    return plainToInstance(PublicUserDto, newUser);

    // const userDto = plainToInstance(CreateUserDto, user);

    // try {
    //   await validateData(userDto);
    //   return this.usersRepository.create(userDto);
    // } catch (error) {
    //   throw error;
    // }
  }

  updateUser(id: string, updateData: UpdateUserDto) {
    return this.usersRepository.updateUser(id, updateData);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteUser(id);
  }
}
