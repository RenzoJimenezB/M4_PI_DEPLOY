import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/auth/enum/roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
