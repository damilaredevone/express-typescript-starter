import { StatusCode } from '@/utils'

export class BaseError extends Error {
  public readonly name: string
  public readonly statusCode: any
  public readonly isOperational: boolean

  constructor(name: string, statusCode: StatusCode, message: string, isOperational?: boolean) {
    super(message)

    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational || false

    Error.captureStackTrace(this)
  }
}
