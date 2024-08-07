import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      name: 'Manel',
      email: 'manel@mail.com',
      password: 'manel123',
      address: 'address 1',
      phone: 'phone 1',
      country: 'España',
      city: undefined,
    },
    {
      id: 2,
      name: 'Pau',
      email: 'pau@mail.com',
      password: 'pau123',
      address: 'address 2',
      phone: 'phone 2',
      country: 'España',
      city: undefined,
    },
    {
      id: 3,
      name: 'Guillem',
      email: 'guillem@mail.com',
      password: 'guillem123',
      address: 'address 3',
      phone: 'phone 3',
      country: 'España',
      city: undefined,
    },
  ];

  async getUsers() {
    return this.users;
  }
}
