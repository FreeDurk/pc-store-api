import { HttpException, HttpStatus } from '@nestjs/common';
export class CategoryNotFound extends HttpException {
  constructor(msg?: string, code?: HttpStatus) {
    super(msg || 'Category not found.', code || HttpStatus.NOT_FOUND);
  }
}
