import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /* Checks if the user's role is included in the required roles for this route */

  canActivate(context: ExecutionContext): boolean {
    // Retrieve the required roles from the metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no specific roles are required, grant access
    if (!requiredRoles) {
      return true;
    }

    // Extract the user object from the request
    const { user } = context.switchToHttp().getRequest();

    // Ensure the user and user.role exist before checking roles
    if (!user || !user.role) {
      throw new UnauthorizedException('User role not found');
    }

    // Check if the user's role is one of the required roles
    return requiredRoles.includes(user.role);
  }
}
