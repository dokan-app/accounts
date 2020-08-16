import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissionDeniedException extends HttpException {
  constructor() {
    // message = 'Permission denied'
    super('PermissionDeniedException', HttpStatus.FORBIDDEN);
  }
}
