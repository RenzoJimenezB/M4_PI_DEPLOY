import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      'roles',
      // key that matches the key passed in SetMetadata
      [context.getHandler(), context.getClass()],
      // array of contexts to look for the metadata
      // context.getHandler(): the method that is currently being executed (i.e the function invoked by the controller)
      // route handler: the method that processes the request for a specific route
      // context.getClass(): the class that contains the handler (the controller class)
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole = () =>
      requiredRoles.some((role) => user?.roles?.includes(role));

    const valid = user && user.roles && hasRole();

    if (!valid) {
      throw new ForbiddenException(
        'You do not have permission and are not allowed to access this route',
      );
    }

    return true;
  }
}
