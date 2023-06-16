import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { EUserRole } from '../../module/user/model/enum';

@Injectable()
export class RolesGuard implements CanActivate {
  private matchRoles(roles: EUserRole[], userRole: string): boolean {
    return roles.some((value) => value === userRole);
  }

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<EUserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const user = request?.user;

    return this.matchRoles(roles, user.role);
  }
}
