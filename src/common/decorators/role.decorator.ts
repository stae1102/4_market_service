import { SetMetadata } from '@nestjs/common';
import UserRole from '../../user/schemas/enums/user-role.enum';

export const Role = (...roles: UserRole[]): any => SetMetadata('roles', roles);
