import { NextFunction, Request, Response } from 'express'

const Login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const damilare = null
    const error = 'damilare'
    if (!damilare) await next(error)
  } catch (error) {
    next(error)
  }
}

const Register = async (req: Request, res: Response): Promise<void> => {
  try {
    return await res.json({})
  } catch (error) {}
}

export { Login, Register }
