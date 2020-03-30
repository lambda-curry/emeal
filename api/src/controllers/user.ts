/* eslint-disable @typescript-eslint/camelcase */

import crypto from 'crypto';
import { User, UserDocument } from '../models/User';
import { Request, Response, Router } from 'express';
import jwt from 'jwt-simple';
import * as yup from 'yup'; // for everything
import { JWT_AUTH_SECRET, notAuthenticatedResponse } from '../middleware/jwt';
import moment from 'moment';
import { sendForgotPasswordEmail } from '../services/mail';
import { Project } from '../models/Project';

const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(1)
    .required()
});

const updatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .required()
});

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required()
});

const getUserForTokenSchema = yup.object().shape({
  token: yup.string().required()
});

const resetPasswordSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup
    .string()
    .min(8)
    .required()
});

export const router = Router();
export const getUser = async (req: Request, res: Response) => {
  if (req.user) {
    const projects = await Project.find({ ownerId: req.user.id });
    return res.json({
      user: req.user.toDto(),
      projects: projects.map(p => p.toDto())
    });
  }
  return notAuthenticatedResponse(res);
};

const buildLoginResponse = async (user: UserDocument, res: Response) => {
  const createdJwt = jwt.encode(
    {
      sub: user.id,
      exp: moment()
        .add(7, 'days')
        .toISOString()
    },
    JWT_AUTH_SECRET
  );
  const projects = await Project.find({ ownerId: user.id });
  return res
    .status(200)
    .cookie('jwt', createdJwt, {
      expires: moment()
        .add(7, 'days')
        .toDate(),
      domain: 'emeal.me',
      sameSite: 'strict',
      secure: true,
      httpOnly: true
    })
    .json({
      jwt: createdJwt,
      user: user.toDto(),
      projects: projects.map(p => p.toDto())
    });
};

/**
 * POST /login
 * Sign in using email and password.
 */
export const postLogin = async (req: Request, res: Response) => {
  await loginSchema.validate(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user || !user.comparePassword(req.body.password)) {
    return res.status(401).json({ errors: ['Incorrect username or password'] });
  }
  return await buildLoginResponse(user, res);
};

/**
 * GET /logout
 * Log out.
 */
export const logout = (req: Request, res: Response) => {
  return res.status(200).clearCookie('jwt');
};

/**
 * POST /signup
 * Create a new local account.
 */
export const signup = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email(),
    password: yup
      .string()
      .min(8)
      .required(),
    projectName: yup.string().required(),
    website: yup
      .string()
      .url()
      .required()
  });

  const body = await schema.validate(req.body);

  const user = new User({
    email: body.email,
    password: body.password,
    name: body.name
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
    ownerId: createdUser.id
  });
  await project.save();
  return await buildLoginResponse(createdUser, res);
};

export const updatePassword = async (req: Request, res: Response) => {
  const body = await updatePasswordSchema.validate(req.body);
  const user = req.user as UserDocument;
  const fetchedUser = await User.findById(user.id);
  fetchedUser.password = body.password;
  await fetchedUser.save();
  res.status(200).json({ message: 'OK' });
};

/**
 * POST /account/delete
 * Delete user account.
 */
export const postDeleteAccount = async (req: Request, res: Response) => {
  const user = req.user as UserDocument;
  await User.remove({ _id: user.id });
  return logout(req, res);
};

const findUserForToken = async (token: string) => {
  return await User.findOne({ passwordResetToken: token })
    .where('passwordResetExpires')
    .gt(Date.now());
};

export const userForResetToken = async (req: Request, res: Response) => {
  const body = await getUserForTokenSchema.validate(req.body);
  const user = await findUserForToken(body.token);

  if (!user)
    return res
      .status(404)
      .json({ errors: ['Could not find a user for provided token'] });
  return res.status(200).json({ id: user.id, email: user.email });
};
/**
 * POST /reset/:token
 * Process the reset password request.
 */
export const resetPassword = async (req: Request, res: Response) => {
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
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */

const createRandomToken = () => crypto.randomBytes(16).toString('hex');

export const forgotPassword = async (req: Request, res: Response) => {
  const body = await forgotPasswordSchema.validate(req.body);
  const token = createRandomToken();
  const user = await User.findOne({ email: body.email });
  if (!user)
    return res
      .status(400)
      .json({ errors: [`Could not find user with email ${body.email}`] });
  user.passwordResetToken = token;
  user.passwordResetExpires = moment()
    .add(24, 'hours')
    .toDate();

  await user.save();
  await sendForgotPasswordEmail(token, user);
  return res.status(200).json({ message: 'Success' });
};
