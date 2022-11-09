import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Users } from '../../users/schemas/users.schemas';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string[]>(
      'roles',
      ctx.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }

    const request = ctx.switchToHttp().getRequest();
    const user = request.user as Users;
    return (
      user && user.role && user.role.some((role) => requiredRole.includes(role))
    );
  }
}
