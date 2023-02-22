import type { ErrorResponse, SuccessResponse } from 'types'

enum status {
  SUCCESS = 200,
  SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CREATED = 201,
  BAD = 400,
  NO_CONTENT = 204,
  CONFLICT = 209,
  UNPROCESSABLE = 422,
}

const successResponse = (
  data = {},
  message = '',
  statusCode = status.SUCCESS,
): SuccessResponse => {
  return {
    success: true,
    data,
    message,
    status: statusCode,
  }
}

const errorResponse = (
  error: any,
  message = 'Sorry, an error occured',
  statusCode = status.BAD,
): ErrorResponse => {
  return {
    success: false,
    error,
    message,
    status: statusCode,
  }
}

export { status, successResponse, errorResponse }
