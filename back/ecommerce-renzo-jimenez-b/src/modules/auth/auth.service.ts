import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { plainToInstance } from 'class-transformer';
import { validateData } from 'src/helpers/validateData';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  getAuth() {
    return 'Get auth';
  }

  async signIn(authDto: AuthDto) {
    const credentials = plainToInstance(AuthDto, authDto);

    try {
      await validateData(credentials);
      const user = await this.usersRepository.findByEmail(credentials.email);
      // call method in Repo or Service?
      if (!user) {
        throw new BadRequestException('Email o password incorrectos');
      }

      const isPasswordValid = user.password === credentials.password;
      if (!isPasswordValid) {
        throw new BadRequestException('Email o password incorrectos');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
