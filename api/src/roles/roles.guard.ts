import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    Logger.log('RolesGuard 1');
    const roles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!roles.length) {
      return true;
    }
    Logger.log('RolesGuard 2');
    const request = context.switchToHttp().getRequest();
    Logger.log('RolesGuard 3');

    return roles.includes(request.user?.role?.id);
  }
}
