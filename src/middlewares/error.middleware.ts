import type { NextFunction, Request, Response } from 'express'
import logger from '@config/logger'
import { StatusCode } from '@/utils'

export const ErrorInterceptor = (error: any, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error?.statusCode || StatusCode.SERVER_ERROR
    const message: string = error?.message || 'Something went wrong'

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)

    res.status(status).json({ status: false, message })
  } catch (err) {
    next(err)
  }
}
