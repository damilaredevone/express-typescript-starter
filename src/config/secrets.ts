import { config } from 'dotenv'
import logger from './logger'

config({ path: '.env' })

export const BASEURL: string | undefined = process.env.BASE_URL

export const ENVIROMENT: string | undefined = process.env.NODE_ENV

const production = ENVIROMENT === 'production'

export const SECRET: string | undefined = process.env.SECRET

export const MONGODB_URI: any = production ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;
export const MONGO_CREATE_INDEX = process.env.MONGO_CREATE_INDEX
export const MONGO_AUTO_INDEX = process.env.MONGO_AUTO_INDEX

export const PORT: string | number | undefined = process.env.PORT

if (!SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}
