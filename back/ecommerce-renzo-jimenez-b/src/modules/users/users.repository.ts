import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOneById(id: string): Promise<User> {
    return this.repository.findOne({
      where: { id },
      relations: { orders: true },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async updateUser(id: number) {
    return `User with id ${id} has been updated`;
  }

  async deleteUser(id: number) {
    return `User with id ${id} has been deleted`;
  }
}
