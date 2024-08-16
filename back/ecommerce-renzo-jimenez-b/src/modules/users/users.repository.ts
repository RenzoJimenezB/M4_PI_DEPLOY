import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  // private users: User[] = [
  //   {
  //     id: 1,
  //     name: 'Manel',
  //     email: 'manel@mail.com',
  //     password: 'manel123',
  //     address: 'address 1',
  //     phone: 'phone 1',
  //     // country: 'España',
  //     // city: undefined,
  //   },
  //   {
  //     id: 2,
  //     name: 'Pau',
  //     email: 'pau@mail.com',
  //     password: 'pau123',
  //     address: 'address 2',
  //     phone: 'phone 2',
  //     // country: 'España',
  //     // city: undefined,
  //   },
  //   {
  //     id: 3,
  //     name: 'Guillem',
  //     email: 'guillem@mail.com',
  //     password: 'guillem123',
  //     address: 'address 3',
  //     phone: 'phone 3',
  //     // country: 'España',
  //     // city: undefined,
  //   },
  // ];

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOneById(id: UUID): Promise<User> {
    return this.repository.findOne({
      where: { id },
      relations: { orders: false },
      // ORDERS!!!
    });
  }
  // RETURN USER with ORDERS ARRAY (only id and date properties, exclude userId)

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOneBy({ email });
    // return user without password?
  }

  async save(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async updateUser(id: number) {
    return `User with id ${id} has been updated`;
  }

  async deleteUser(id: number) {
    return `User with id ${id} has been deleted`;
  }
}
