import Validator from 'validatorjs'
import type { NextFunction, Request, Response } from 'express'
import { errorResponse, status } from '../utils/status'
import type { Rules } from '../types'

export const LoginRequest = (req: Request, res: Response, next: NextFunction) => {
  const rules: Rules = {
    email: 'required|email',
    password: 'required',
  }

  const validator = new Validator(req.body, rules)
  validator.passes(() => next())
  validator.fails(() => {
    return res.json(
      errorResponse(validator.errors.all(), 'Invalid Form Data', status.UNPROCESSABLE),
    )
  })
}

export const RegisterRequest = (req: Request, res: Response, next: NextFunction) => {
  const rules: Rules = {
    firstname: 'required',
    lastname: 'required',
    phone: 'required|phone',
    email: 'required|email',
    password: 'required|min:6',
  }

  const validator = new Validator(req.body, rules)
  validator.passes(() => next())
  validator.fails(() => {
    return res.json(errorResponse(validator.errors.all(), 'validation erorr', status.UNPROCESSABLE))
  })
}
