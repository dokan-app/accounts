import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { AppRequest } from 'src/shared/types';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { PermissionDeniedException } from 'src/shared/exceptions/PermissionDeniedException';

@Injectable()
export class AuthenticatedAdminGuardGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: AppRequest = context.switchToHttp().getRequest();

    if (!request.isAuthenticated()) {
      throw new PermissionDeniedException();
    }

    if (request.user.domain !== AUTH_DOMAIN.ADMIN) {
      throw new PermissionDeniedException();
    }

    return true;
  }
}
