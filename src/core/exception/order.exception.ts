import { HttpException, HttpStatus } from '@nestjs/common';

export class AnotherManagerException extends HttpException {
  constructor() {
    super(
      'This order is already handled by another manager',
      HttpStatus.FORBIDDEN,
    );
  }
}
