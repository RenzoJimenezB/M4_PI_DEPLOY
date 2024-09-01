import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

function validateRequest(request: Request) {
  const authorization = request.headers['authorization'];

  if (!authorization) {
    throw new UnauthorizedException('Authorization header does not exist');
  }

  const email = authorization.split(':')[0];
  const password = authorization.split(':')[1];

  if (!email || !password) {
    throw new UnauthorizedException('Invalid credentials');
  }

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
