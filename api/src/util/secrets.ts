import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
  console.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  console.debug(
    'Using .env.example file to supply config environment variables'
  );
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
export const MONGODB_URI = process.env['MONGODB_URI'];
export const MONGO_CONNECTION_OPTIONS: any = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  sslValidate: false,
};

export const SENTRY_DSN = process.env['SENTRY_DSN'];

export const STRIPE_PLAN_ID = process.env['STRIPE_PLAN_ID'];

export const STRIPE_API_KEY = process.env['STRIPE_API_KEY'];

export const ENVIRONMENT = process.env['ENVIRONMENT'];

export const PRODUCTION = ENVIRONMENT === 'production';

export const JWT_NAME = PRODUCTION ? 'jwt' : 'devjwt';

export const AUTH_SECRET: string =
  process.env['JWT_AUTH_SECRET'] || 'sooper-secret';

if (!MONGODB_URI) {
  console.error(
    'No mongo connection string. Set MONGODB_URI environment variable.'
  );
  process.exit(1);
}
