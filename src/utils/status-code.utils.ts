import type { ErrorResponse, SuccessResponse } from '@/types'

export enum StatusCode {
  OK = 200,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CREATED = 201,
  BAD_REQUEST = 400,
  NO_CONTENT = 204,
  CONFLICT = 209,
  UNPROCESSABLE = 422,
}

export const successResponse = (
  data = {},
  message = '',
  statusCode = StatusCode.OK,
): SuccessResponse => {
  return {
    success: true,
    data,
    message,
    status: statusCode,
  }
}

export const errorResponse = (
  error: any,
  message = 'Sorry, an error occured',
  statusCode = StatusCode.BAD_REQUEST,
): ErrorResponse => {
  return {
    success: false,
    error,
    message,
    status: statusCode,
  }
}
