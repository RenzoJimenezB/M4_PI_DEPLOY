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
      const tokenPayload = this.jwtService.verify(token, { secret });
      // manually passing the secret for verification is optional
      // the secret is already globally registered in JwtModule
      // JwtService uses the secret set globally for both signing and verifying

      // .verify() returns the decoded payload of the JWT
      // includes data that was encoded into the token when it was created
      // console.log(payload);

      tokenPayload.iat = new Date(tokenPayload.iat * 1000).toLocaleString('es');
      tokenPayload.exp = new Date(tokenPayload.exp * 1000).toLocaleString('es');

      console.log({ tokenPayload });
      request.user = tokenPayload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
