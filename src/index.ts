import type { Request, Response } from 'express'
import express from 'express'
import bodyParser from 'body-parser'
import errorHandler from 'errorhandler'
import compression from 'compression'
import cors from 'cors'
import routes from './routes'
import db from './config/db'
import { ENVIROMENT, PORT } from './config/secrets'

const app = express()
const port = PORT || 5000

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)

app.use(compression())

app.use(bodyParser.json())
app.use(cors())

db.open()

if (ENVIROMENT === 'development') {
  app.use(errorHandler())
}

// routes
app.use('/api', routes)

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    message: 'Invalid Route',
  })
})

app.listen(port, () =>
  console.log(`app listening on port ${port} in ${ENVIROMENT}`),
)

export default app
