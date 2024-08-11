import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './AuthDto';
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
      if (!user) {
        throw new BadRequestException('Invalid email or password');
      }

      const isPasswordValid = user.password === credentials.password;
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid email or password');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
