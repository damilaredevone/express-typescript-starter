import { StatusCode } from '@/utils/status'

export class BaseError extends Error {
  public readonly name: string
  public readonly statusCode: any
  public readonly isOperational: boolean

  constructor(name: string, statusCode: StatusCode, message: string, isOperational: boolean) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}
