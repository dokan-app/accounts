import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AppRequest } from 'src/shared/types';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { PermissionDeniedException } from 'src/shared/exceptions/PermissionDeniedException';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: AppRequest = context.switchToHttp().getRequest();

    if (!request.isAuthenticated()) {
      throw new PermissionDeniedException();
    }

    if (request.user.domain !== AUTH_DOMAIN.USER) {
      throw new PermissionDeniedException();
    }

    return true;
  }
}
