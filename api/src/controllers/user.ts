import { UserDocument, User } from '../models/User';
import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as yup from 'yup'; // for everything
import { authenticateUser } from '../middleware/jwt';

export const router = Router()
  .get('', authenticateUser, asyncHandler(getUser))
  .patch('', authenticateUser, asyncHandler(updateUser))
  .put('/password', authenticateUser, asyncHandler(updatePassword))
  .get('/token/:token', asyncHandler(userForResetToken));

const updatePasswordSchema = yup.object().shape({
  password: yup.string().min(8).required(),
});

const updateUserSchema = yup.object().shape({
  email: yup.string(),
  name: yup.string(),
});

async function getUser(req: Request, res: Response) {
  return res.json({
    user: req.user.toDto(),
  });
}

async function updateUser(req: Request, res: Response) {
  const body = await updateUserSchema.validate(req.body, {
    stripUnknown: true,
  });
  const user = req.user as UserDocument;
  Object.assign(user, body);
  await user.save();
  res.json({ user: user.toDto() });
}

async function updatePassword(req: Request, res: Response) {
  const body = await updatePasswordSchema.validate(req.body);
  const user = req.user as UserDocument;
  user.password = body.password;
  await user.save();
  res.status(200).json({ message: 'OK' });
}

async function findUserForToken(token: string) {
  return await User.findOne({ passwordResetToken: token })
    .where('passwordResetExpires')
    .gt(Date.now());
}

async function userForResetToken(req: Request, res: Response) {
  const token = req.params.token;
  const user = await findUserForToken(token);

  if (!user)
    return res
      .status(404)
      .json({ errors: ['Could not find a user for provided token'] });
  return res.status(200).json({ id: user.id, email: user.email });
}
