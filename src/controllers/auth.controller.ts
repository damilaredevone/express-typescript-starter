import { NextFunction, Request, Response } from 'express'

export class AuthController {
  public login = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response<any, Record<string, any>> | undefined => {
    try {
      return res.status(200).json({ data: true })
    } catch (error) {
      next(error)
    }
  }

  public register = (req: Request, res: Response): any => {
    try {
      return res.status(200).json({ data: true })
    } catch (error) {}
  }
}
