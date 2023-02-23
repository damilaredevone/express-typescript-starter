import type { Router as IRouter, Request, Response } from 'express'
import { Router } from 'express'
import { LoginRequest } from '@/requests/auth.request'
import { AuthController } from '@/controllers/auth.controller'
import { LoginDto } from '@/dtos/login.dto'
// import { HttpException } from '@/exceptions'
import { validateRequest } from '@/middlewares'

const authRoutes: IRouter = Router()

const authController = new AuthController()

authRoutes.post('/login', LoginRequest, authController.login)

authRoutes.get('/register', validateRequest(LoginDto, 'body'), (req: Request, res: Response) =>
  res.status(200).json({ data: true }),
)

export default authRoutes
