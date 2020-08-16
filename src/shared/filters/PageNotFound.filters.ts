import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppRequest } from '../types';

@Catch(NotFoundException)
export class PageNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<AppRequest>();

    if (request.url.includes('/api/')) {
      response.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
    } else {
      response.render('notFound');
    }
  }
}
