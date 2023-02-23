import { plainToClass } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import type { RequestHandler } from 'express'
// import { HttpException } from '@/exceptions'

export const validateRequest = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    const dtoObj = plainToClass(type, req.body)

    validate(dtoObj, { skipMissingProperties, whitelist, forbidNonWhitelisted }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          // const dtoErrors = errors
          //   .map((error: ValidationError) => (Object as any).values(error.constraints))
          //   .join(', ')
          console.log(errors)
          next()
        } else {
          req.body = dtoObj
          next()
        }
      },
    )
  }
}
