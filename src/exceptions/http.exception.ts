import { BaseError } from './base.exception'
import { StatusCode } from '@/utils'

export class HttpException extends BaseError {
  constructor(
    name: string,
    statusCode = StatusCode.BAD_REQUEST,
    message = 'Bad Request',
    isOperational = true,
  ) {
    super(name, statusCode, message, isOperational)
  }
}
