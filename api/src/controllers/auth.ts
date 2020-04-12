import crypto from 'crypto';
import { User, UserDocument, stripeDto } from '../models/User';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jwt-simple';
import * as yup from 'yup';
import moment from 'moment';
import { sendForgotPasswordEmail } from '../services/mail';
import { Project } from '../models/Project';
import { PRODUCTION, AUTH_SECRET, JWT_NAME } from '../util/secrets';
import { createStripeCustomer } from '../services/stripe';

export const router = Router()
  .post('/login', asyncHandler(postLogin))
  .post('/logout', asyncHandler(logout))
  .post('/forgotPassword', asyncHandler(forgotPassword))
  .post('/resetPassword', asyncHandler(resetPassword))
  .post('/signup', asyncHandler(signup));

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(1).required(),
});

const resetPasswordSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().min(8).required(),
});

async function buildLoginResponse(user: UserDocument, res: Response) {
  const createdJwt = jwt.encode(
    {
      sub: user.id,
      exp: moment().add(7, 'days').toISOString(),
    },
    AUTH_SECRET
  );
  const projects = await Project.find({ ownerId: user.id });
  return res
    .status(200)
    .cookie(JWT_NAME, createdJwt, {
      expires: moment().add(7, 'days').toDate(),
      domain: PRODUCTION ? '.emeal.me' : undefined,
      sameSite: 'lax',
      secure: PRODUCTION,
      httpOnly: true,
    })
    .json({
      session: {
        jwt: createdJwt,
        user: user.toDto(),
        projects: projects.map((p) => p.toDto()),
      },
    });
}

/**
 * POST /login
 * Sign in using email and password.
 */
async function postLogin(req: Request, res: Response) {
  await loginSchema.validate(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user || !user.comparePassword(req.body.password)) {
    return res.status(401).json({ errors: ['Incorrect username or password'] });
  }
  return await buildLoginResponse(user, res);
}

/**
 * GET /logout
 * Log out.
 */
async function logout(req: Request, res: Response) {
  return res
    .status(200)
    .cookie(JWT_NAME, '', {
      expires: moment().add(7, 'days').toDate(),
      domain: PRODUCTION ? '.emeal.me' : undefined,
      sameSite: 'lax',
      secure: PRODUCTION,
      httpOnly: true,
    })
    .json({ message: 'Logged out' });
}

const signupSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().min(8).required(),
  projectName: yup.string().required(),
  website: yup.string().url().required(),
});

async function signup(req: Request, res: Response) {
  const body = await signupSchema.validate(req.body);

  const user = new User({
    email: body.email,
    password: body.password,
    name: body.name,
  });

  const existingUser = await User.findOne({ email: body.email });

  if (existingUser)
    return res
      .status(400)
      .json({ errors: ['User with this email already exists'] });

  const createdUser = await user.save();
  const project = new Project({
    name: body.projectName,
    website: body.website,
    ownerId: createdUser.id,
  });

  const customer = await createStripeCustomer(createdUser);
  createdUser.stripe = stripeDto(customer, null);

  await createdUser.save();
  await project.save();
  return await buildLoginResponse(createdUser, res);
}

async function findUserForToken(token: string) {
  return await User.findOne({ passwordResetToken: token })
    .where('passwordResetExpires')
    .gt(Date.now());
}

/**
 * POST /reset/:token
 * Process the reset password request.
 */
async function resetPassword(req: Request, res: Response) {
  const body = await resetPasswordSchema.validate(req.body);
  const user = await findUserForToken(body.token);
  if (!user)
    return res
      .status(404)
      .json({ errors: ['Could not find a user for provided token'] });
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  return await buildLoginResponse(user, res);
}

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */

const createRandomToken = () => crypto.randomBytes(16).toString('hex');

async function forgotPassword(req: Request, res: Response) {
  const body = await forgotPasswordSchema.validate(req.body);
  const token = createRandomToken();
  const user = await User.findOne({ email: body.email });
  if (!user)
    return res
      .status(400)
      .json({ errors: [`Could not find user with email ${body.email}`] });
  user.passwordResetToken = token;
  user.passwordResetExpires = moment().add(24, 'hours').toDate();

  await user.save();
  await sendForgotPasswordEmail(token, user);
  return res.status(200).json({ message: 'Success' });
}
