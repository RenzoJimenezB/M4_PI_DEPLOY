import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersRepository } from '../src/modules/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { User } from '../src/modules/users/entities/users.entity';
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockUsersRepository: Partial<jest.Mocked<UsersRepository>>;
  let jwtService: JwtService;

  const mockUser: Partial<User> = {
    // id: 'mock_id',
    name: 'mock_name',
    email: 'mock_email',
    password: 'mock_password',
    phone: 999999999,
    country: 'mock_country',
    city: 'mock_city',
    address: 'mock_address',
    isAdmin: true,
    // orders: [],
  };
  // consider using an array with admin users to test roles implementation

  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: jest.fn().mockResolvedValue(mockUser),
      create: jest.fn().mockResolvedValue(mockUser),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
    jest.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(password === 'mock_password');
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/signin (POST) should auth user and return a token', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'mock_email', password: 'mock_password' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeDefined();
      });
  });

  it('/auth/signin (POST) should auth user and return a bad request 400', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'mock_email', password: 'wrong_mock_password' })
      .expect(400);
  });

  it('/auth/signup (POST) should create and return a new user excluding "password" and "isAdmin"', () => {
    mockUsersRepository.findByEmail = jest.fn().mockResolvedValue(null);

    const { isAdmin, ...rest } = mockUser;

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        ...rest,
        password: 'Password123!',
        passwordConfirmation: 'Password123!',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).not.toHaveProperty('password');
        expect(res.body).not.toHaveProperty('passwordConfirmation');
        expect(res.body).not.toHaveProperty('isAdmin');
      });
  });
});
