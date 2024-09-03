import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { EntityManager, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async create(user: CreateUserDto): Promise<User> {
    return this.repository.save(user);
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No update data provided');
    }

    await this.repository.update(id, updateData);

    const updatedUser = await this.repository.findOneBy({ id });

    console.log(`User with ID ${id} has been updated`);
    return updatedUser;
  }

  async deleteUser(id: number) {
    return `User with ID ${id} has been deleted`;
  }
}
