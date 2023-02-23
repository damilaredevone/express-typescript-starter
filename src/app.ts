import express from 'express'
import type { Request, Response } from 'express'
import { ENVIROMENT, PORT } from '@config/secrets'
import pc from 'picocolors'
import db from '@config/db'
import compression from 'compression'
import cors from 'cors'
import errorHandler from 'errorhandler'
import routes from './routes'

export class App {
  public app: express.Application
  public env: string
  public port: string | number

  constructor() {
    this.app = express()
    this.env = ENVIROMENT ?? 'development'
    this.port = PORT ?? 5500

    this.connectToDatabase().initializeMiddlewares().initializeErrorHandling().initializeRoutes()
  }

  public getApplication(): express.Application {
    return this.app
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('=================================')
      console.log(pc.bold(`======= ENV: ${pc.blue(this.env)} =======`))
      console.log(pc.green(`🚀 App listening on the port ${this.port}`))
      console.log('=================================')
    })
  }

  private connectToDatabase(): this {
    db.connect()

    return this
  }

  private initializeMiddlewares(): this {
    this.app.use(cors())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    return this
  }

  private initializeErrorHandling(): this {
    if (ENVIROMENT === 'development') {
      this.app.use(errorHandler())
    }

    return this
  }

  private initializeRoutes(): this {
    this.app.use('/api', routes)

    this.app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        message: 'Invalid Route',
      })
    })

    return this
  }
}
