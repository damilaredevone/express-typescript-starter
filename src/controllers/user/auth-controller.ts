import { NextFunction, Request, Response } from 'express'

const Login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    return res.status(200).json({ data: true })
  } catch (error) {
    next(error)
  }
}

const Register = (req: Request, res: Response): any => {
  try {
    return res.status(200).json({ data: true })
  } catch (error) {}
}

export { Login, Register }
