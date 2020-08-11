import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from '../auth.guard';
import { AuthGuard } from '@nestjs/passport';

export const Auth = (...domains: AUTH_DOMAIN[]) => {
  return applyDecorators(
    SetMetadata('domains', domains),
    UseGuards(AuthGuard('jwt'), RoleGuard),
    ApiBearerAuth(),
  );
};
