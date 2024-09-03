import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOneById(id: string, manager?: EntityManager): Promise<User> {
    const repository = manager ? manager.getRepository(User) : this.repository;

    return repository.findOne({
      where: { id },
      relations: { orders: true },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
  }

  async create(user: CreateUserDto) {
    return this.repository.save(user);
  }

  async updateUser(id: number) {
    return `User with id ${id} has been updated`;
  }

  async deleteUser(id: number) {
    return `User with id ${id} has been deleted`;
  }
}
