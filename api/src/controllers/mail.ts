import * as mailService from '../services/mail';
import { Request, Response } from 'express';

export const sendTestMail = async (req: Request, res: Response) => {
  await mailService.sendTestMail();
  res.status(200).json({ message: 'sent' });
};
