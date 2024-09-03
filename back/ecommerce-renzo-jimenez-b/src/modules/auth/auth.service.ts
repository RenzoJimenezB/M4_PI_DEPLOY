import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';
import { UsersRepository } from '../users/users.repository';
import { PublicUserDto } from '../users/dto/public-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  getAuth() {
    return 'Get auth';
  }

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || user?.password !== password) {
      throw new BadRequestException('Email o password incorrectos');
    }

    console.log(`El usuario ${user.id} ha iniciado sesión`);
    return user;

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
