import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@src/features/user/user.interface';

const matchRoles = (roles:UserRole[], userRoles:UserRole) => {
  return roles.some(role => role === userRoles);
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest() as any;
    const user = req.user;
    return matchRoles(roles, user.role);
  }
}
