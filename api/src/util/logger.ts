import winston from 'winston';
import * as Sentry from '@sentry/node';
import { SENTRY_DSN, ENVIRONMENT } from './secrets';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    }),
  ],
};

console.log('SENTRY_DSN', SENTRY_DSN);
Sentry.init({
  dsn: SENTRY_DSN,
  environment: ENVIRONMENT,
});

const logger = winston.createLogger(options);

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
