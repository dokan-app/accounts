import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_DOMAIN } from 'src/session/session.types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const domains = this.reflector.get<AUTH_DOMAIN[]>(
      'domains',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    if (!domains?.length) {
      return true;
    } else {
      const hasRole = domains.includes(request.user.domain);
      if (hasRole) return true;
      else throw new ForbiddenException('Permission denied');
    }
  }
}
