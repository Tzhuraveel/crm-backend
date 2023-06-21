import { HttpException, HttpStatus } from '@nestjs/common';

export class AnotherManagerException extends HttpException {
  constructor() {
    super(
      'This order is already handled by another manager',
      HttpStatus.FORBIDDEN,
    );
  }
}

export class NotFoundEntityException extends HttpException {
  constructor(private entity) {
    super(`${entity} not found`, HttpStatus.NOT_FOUND);
  }
}
