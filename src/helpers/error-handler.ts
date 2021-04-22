import { status } from './status'

class BaseError extends Error {
    public readonly name: string;
    public readonly statusCode: status;
    public readonly isOperational: boolean;

    constructor(
        name: string,
        statusCode: status,
        message: string,
        isOperational: boolean
    ) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}

class ErrorResponse extends BaseError {
    constructor(
        name: string,
        statusCode = status.SERVER_ERROR,
        message = 'Internal Server Error',
        isOperational = true
    ) {
        super(name, statusCode, message, isOperational);
    }
}

export default ErrorResponse