import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './entities/users.entity';
import { plainToInstance } from 'class-transformer';
import { PublicUserDto } from './dto/public-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository: Partial<jest.Mocked<UsersRepository>>;

  beforeEach(async () => {
    mockUsersRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of users excluding "password" but exposing "isAdmin"', async () => {
      const users: User[] = [
        {
          id: '1',
          name: 'user1',
          email: 'email1',
          password: 'password1',
          phone: 999999999,
          country: 'country1',
          city: 'city1',
          address: 'address1',
          isAdmin: true,
          orders: [],
        },
      ];

      mockUsersRepository.findAll.mockResolvedValue(users);
      const result = await service.getUsers();

      expect(result).toEqual(
        plainToInstance(PublicUserDto, users, { groups: ['admin'] }),
      );
      expect(mockUsersRepository.findAll).toHaveBeenCalled();
    });
  });
});
