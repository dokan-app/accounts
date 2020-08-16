import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PermissionDeniedException } from '../exceptions/PermissionDeniedException';

interface IRequestFlash extends Request {
  flash: any;
}

@Catch(HttpException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequestFlash>();

    if (exception instanceof UnauthorizedException) {
      request.flash('errorMsg', 'Invalid credentials');
      response.redirect(request.url);
    }
    if (
      exception instanceof ForbiddenException ||
      exception instanceof PermissionDeniedException
    ) {
      request.flash('errorMsg', exception.message);
      response.redirect('/');
    } else {
      request.flash('errorMsg', exception.message);
      response.redirect(request.url);
    }
  }
}
