import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { AppRequest } from 'src/shared/types';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request: AppRequest = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
