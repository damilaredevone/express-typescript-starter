import type { Request, Response } from 'express'
import { Router } from 'express'
import { errorResponse } from '../helpers/status'
import { LoginRequest } from '../requests/auth-request'
import { BASEURL } from '../config/secrets'
import { Login } from '../controllers/user/auth-controller'

const authRoutes = Router()

authRoutes.post('/login', LoginRequest, Login)

authRoutes.get('/register', (req: Request, res: Response) => res.json(errorResponse(BASEURL)))

export default authRoutes
