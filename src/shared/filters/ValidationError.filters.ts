import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface IRequestFlash extends Request {
  flash: any;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<IRequestFlash>();

    if (request.url.includes('/api/')) {
      response.json(exception);
    } else {
      const err: any = exception;
      request.flash('errorMsg', 'You have some validation error');
      request.flash('errors', err.response.errors);
      response.redirect('back');
    }
  }
}
