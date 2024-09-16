import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';
import { UsersRepository } from '../users/users.repository';
import { PublicUserDto } from '../users/dto/public-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enum/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto): Promise<PublicUserDto> {
    const dbUser = await this.usersRepository.findByEmail(user.email);
    if (dbUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hashed');
    }

    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });

    return plainToInstance(PublicUserDto, newUser);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const userPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };

    console.log({ userPayload });

    const token = this.jwtService.sign(userPayload);

    return {
      message: `El usuario ${user.id} ha iniciado sesión`,
      roles: userPayload.roles,
      token,
    };

    //   const credentials = plainToInstance(AuthDto, authDto);

    //   try {
    //     await validateData(credentials);
    //     const user = await this.usersRepository.findByEmail(credentials.email);

    //     if (!user || user?.password !== password) {
    //       throw new BadRequestException('Email o password incorrectos');
    //     }

    //     return user;
    //   } catch (error) {
    //     throw error;
    //   }
  }
}
