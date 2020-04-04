import express from 'express';
import compression from 'compression'; // compresses requests
import bodyParser from 'body-parser';
import lusca from 'lusca';
import mongoose from 'mongoose';
import session from 'express-session';
import mongo from 'connect-mongo';
import cookieParser from 'cookie-parser';
import {
  MONGODB_URI,
  MONGO_CONNECTION_OPTIONS,
  AUTH_SECRET,
} from './util/secrets';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/error';
import { apiRouter } from './controllers/routes';

const MongoStore = mongo(session);

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
const mongoConnectionOptions = MONGO_CONNECTION_OPTIONS;

mongoose
  .connect(mongoUrl, mongoConnectionOptions)
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
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
  .use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: AUTH_SECRET,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
      store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true,
        mongoOptions: mongoConnectionOptions,
      }),
    })
  )
  .use('/api', apiRouter)
  .use(errorHandler);

export default app;
