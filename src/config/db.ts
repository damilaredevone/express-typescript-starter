import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import logger from './logger'
import { MONGODB_URI, MONGO_AUTO_INDEX, MONGO_CREATE_INDEX } from './secrets'

type MongoOptions = {
  useNewUrlParser: boolean
  useCreateIndex?: any
  autoIndex: any
  useUnifiedTopology: boolean
  keepAlive?: boolean
  keepAliveInitialDelay?: number
  serverSelectionTimeoutMS?: number
  socketTimeoutMS?: number
}

mongoose.Promise = global.Promise
mongoose.set('debug', process.env.DEBUG !== undefined)
mongoose.set('strictQuery', false)

const options: MongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: MONGO_CREATE_INDEX,
  autoIndex: MONGO_AUTO_INDEX,
  useUnifiedTopology: true,
  keepAlive: true,
  keepAliveInitialDelay: 300000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}

class MongoConnection {
  private static _instance: MongoConnection

  private memoryServer?: MongoMemoryServer

  static getInstance(): MongoConnection {
    if (!MongoConnection._instance) {
      MongoConnection._instance = new MongoConnection()
    }
    return MongoConnection._instance
  }

  public async open(): Promise<void> {
    try {
      if (MONGODB_URI === 'inmemory') {
        logger.debug('connecting to inmemory db')
        this.memoryServer = new MongoMemoryServer()
        const mongoURI = this.memoryServer.getUri()
        await mongoose.connect(mongoURI, { ...options })
      } else {
        logger.debug(`connecting to mongo db: ${MONGODB_URI}`)
        mongoose.connect(MONGODB_URI, { ...options })

        mongoose.connection.on('connected', () => logger.info('Mongo: connected'))
        mongoose.connection.on('disconnected', () => logger.error('disconnected'))

        mongoose.connection.on('error', (error) => {
          logger.error(`Mongo: ${error.toString()}`)
          if (error.name === 'MongoNetworkError') {
            setTimeout(() => mongoose.connect(MONGODB_URI, options).catch(() => {}), 5000)
          }
        })
      }
    } catch (error) {
      logger.debug(`db open: ${error}`)
      throw error
    }
  }

  public async close(): Promise<void> {
    try {
      // closing the database connection instance
      await mongoose.disconnect()
      if (MONGODB_URI === 'inmemory') {
        await this.memoryServer!.stop()
      }
    } catch (error) {
      logger.error(`db.open: ${error}`)
      throw error
    }
  }
}

export default MongoConnection.getInstance()
