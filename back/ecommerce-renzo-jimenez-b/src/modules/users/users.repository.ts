import { Injectable } from '@nestjs/common';
import { User } from './users.interface';
import { UserDto } from './UserDto';
import { CreateUserDto } from './CreateUserDto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    {
      id: 1,
      name: 'Manel',
      email: 'manel@mail.com',
      password: 'manel123',
      address: 'address 1',
      phone: 'phone 1',
      // country: 'España',
      // city: undefined,
    },
    {
      id: 2,
      name: 'Pau',
      email: 'pau@mail.com',
      password: 'pau123',
      address: 'address 2',
      phone: 'phone 2',
      // country: 'España',
      // city: undefined,
    },
    {
      id: 3,
      name: 'Guillem',
      email: 'guillem@mail.com',
      password: 'guillem123',
      address: 'address 3',
      phone: 'phone 3',
      // country: 'España',
      // city: undefined,
    },
  ];

  async getUsers() {
    const users = this.users.map((user) => {
      const userDto = plainToInstance(UserDto, user);
      return userDto;
    });
    return users;
  }

  async getById(id: number) {
    const user = this.users.find((user) => user.id === id);
    const userDto = plainToInstance(UserDto, user);

    return userDto;
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
  // return user without password?

  async createUser(createUserDto: CreateUserDto) {
    const id = this.users.length + 1;
    this.users = [...this.users, { id, ...createUserDto }];
    return { id };
  }

  async updateUser(id: number) {
    return `User with id ${id} has been updated`;
  }

  async deleteUser(id: number) {
    return `User with id ${id} has been deleted`;
  }
}
