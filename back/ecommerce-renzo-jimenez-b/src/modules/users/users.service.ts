import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
// import { User } from './users.interface';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: UUID): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: false,
        // ORDERS!!!
      },
    });
  }
  // RETURN USER with ORDERS ARRAY (only id and date properties, exclude userId)

  async createUser(createUserDto: CreateUserDto) {
    const userDto = plainToInstance(CreateUserDto, createUserDto);

    try {
      await validateData(userDto);
      return this.usersRepository.save(userDto);
    } catch (error) {
      throw error;
    }
  }

  // updateUser(id: number) {
  //   return this.usersRepository.updateUser(id);
  // }

  // deleteUser(id: number) {
  //   return this.usersRepository.deleteUser(id);
  // }
}
