import type { Router as IRouter, Request, Response } from 'express'
import { Router } from 'express'
// import { errorResponse } from '../utils/status-code.utils'
import { LoginRequest } from '../requests/auth.request'
// import { BASEURL } from '../config/secrets'
import { Login } from '../controllers/auth.controller'
import { HttpException } from '@/exceptions'

const authRoutes: IRouter = Router()

authRoutes.post('/login', LoginRequest, Login)

authRoutes.get('/register', (req: Request, res: Response) => {
  throw new HttpException('How are you')
})

export default authRoutes
