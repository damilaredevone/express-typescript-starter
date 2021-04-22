import { LoggerOptions, createLogger, transports, format } from 'winston'

const options: LoggerOptions = {
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
        }),
        new transports.File({ filename: 'debug.log', level: 'debug' }),

        new transports.File({ filename: 'errors.log', level: 'error' })
    ]
}

const logger = createLogger(options)

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.json()
        )
    }));
    logger.debug('Logging initialized at debug level')
}

export default logger