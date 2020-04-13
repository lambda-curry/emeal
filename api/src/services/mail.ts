import { UserDocument } from '../models/User';
import sendgrid from '@sendgrid/mail';
import { CouponDocument } from '../models/Coupon';

const SYSTEM_EMAIL_FROM =
  process.env['SYSTEM_EMAIL_FROM'] || 'support@emeal.me';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendForgotPasswordEmail = async (
  token: string,
  user: UserDocument
) => {
  const message = {
    templateId: 'd-3af04204d9974d66b6b09420a4b69e4f',
    from: { name: 'Emeal Support', email: SYSTEM_EMAIL_FROM },
    to: user.email,
    dynamicTemplateData: {
      resetPasswordUrl: `https://app.emeal.me/change-password/${token}`,
    },
  };
  await sendgrid.send(message);
};

export const sendCouponEmail = async (coupon: CouponDocument) => {
  const message = {
    templateId: 'd-ee9d35566b2f461dace56636ed0785c8',
    from: { name: coupon.projectName, email: SYSTEM_EMAIL_FROM },
    to: coupon.email,
    dynamicTemplateData: {
      projectName: coupon.projectName,
      imageUrl: coupon.image,
      title: coupon.title,
      redeemUrl: `https://app.emeal.me/redeem/${coupon.token}`,
      description: coupon.description,
    },
  };
  await sendgrid.send(message);
};

export const sendTestMail = async () => {
  const msg = {
    to: 'derek.wene@gmail.com',
    from: 'marcus@resocked.me',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  await sendgrid.send(msg);
};
