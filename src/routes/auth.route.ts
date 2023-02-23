import type { Router as IRouter, Request, Response } from 'express'
import { Router } from 'express'
import { errorResponse } from '../utils/status'
import { LoginRequest } from '../requests/auth-request'
import { BASEURL } from '../config/secrets'
import { Login } from '../controllers/auth.controller'

const authRoutes: IRouter = Router()

authRoutes.post('/login', LoginRequest, Login)

authRoutes.get('/register', (req: Request, res: Response) => res.json(errorResponse(BASEURL)))

export default authRoutes
