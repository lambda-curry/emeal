import { UserDocument } from '../models/User';
import sendgrid from '@sendgrid/mail';

const SYSTEM_EMAIL_FROM =
  process.env['SYSTEM_EMAIL_FROM'] || 'support@emeal.me';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendForgotPasswordEmail = async (
  token: string,
  user: UserDocument
) => {
  const msg = {
    templateId: 'd-3af04204d9974d66b6b09420a4b69e4f',
    from: SYSTEM_EMAIL_FROM,
    to: user.email,
    dynamicTemplateData: {
      resetPasswordUrl: `https://app.emeal.me/forgotPassword/${token}`
    }
  };
  await sendgrid.send(msg);
};

export const sendTestMail = async () => {
  const msg = {
    to: 'derek.wene@gmail.com',
    from: 'marcus@resocked.me',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };
  await sendgrid.send(msg);
};
