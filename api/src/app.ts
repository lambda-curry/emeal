import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { MONGODB_URI, MONGO_CONNECTION_OPTIONS } from './util/secrets';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/error';
import { apiRouter } from './controllers/routes';
import logger from './util/logger';

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
const mongoConnectionOptions = MONGO_CONNECTION_OPTIONS;

mongoose
  .connect(mongoUrl, mongoConnectionOptions)
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err) => {
    logger.error(
      'MongoDB connection error. Please make sure MongoDB is running. ',
      err
    );
    // process.exit();
  });

// Create Express server
const app = express()
  .set('port', process.env.PORT || 3000)
  .use(compression())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(lusca.xframe('SAMEORIGIN'))
  .use(lusca.xssProtection(true))
  .use(corsMiddleware)
  .use('/api', apiRouter)
  .use(errorHandler);

export default app;
