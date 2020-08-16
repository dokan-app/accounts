import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AppRequest } from '../types';
import { PermissionDeniedException } from '../exceptions/PermissionDeniedException';

@Catch(PermissionDeniedException)
export class PermissionDeniedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<AppRequest>();

    if (request.url.includes('/api/')) {
      response.status(HttpStatus.FORBIDDEN).json({
        statusCode: HttpStatus.FORBIDDEN,
        message: exception.message,
      });
    } else {
      request.flash('errorMsg', exception.message);
      response.redirect('back');
    }
  }
}
