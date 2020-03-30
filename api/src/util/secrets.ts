import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug(
    'Using .env.example file to supply config environment variables'
  );
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
export const MONGODB_URI = process.env['MONGODB_URI'];
export const MONGO_CONNECTION_OPTIONS: any = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  sslValidate: false
};

if (!MONGODB_URI) {
  logger.error(
    'No mongo connection string. Set MONGODB_URI environment variable.'
  );
  process.exit(1);
}
