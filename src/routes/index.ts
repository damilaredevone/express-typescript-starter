import { type Router as IRouter, Router } from 'express'
import authRoutes from './auth.route'

const router: IRouter = Router()

router.use('/auth', authRoutes)

export default router
