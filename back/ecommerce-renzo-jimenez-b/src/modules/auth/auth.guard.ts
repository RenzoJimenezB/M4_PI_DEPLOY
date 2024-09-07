import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token missing or invalid');
    }

    const token = authHeader.split(' ')[1];

    // const token = request.headers['authorization'].split(' ')[1];

    // if (!token) {
    //   throw new UnauthorizedException('Bearer token not found');
    // }

    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, { secret });
      // .verify returns the decoded payload of the JWT
      // includes data that was encoded into the token when it was created
      // console.log(payload);

      payload.iat = new Date(payload.iat * 1000).toLocaleString('es');
      payload.exp = new Date(payload.exp * 1000).toLocaleString('es');

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
