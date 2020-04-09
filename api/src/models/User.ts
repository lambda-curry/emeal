import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { UserDto, StripeDto } from '@shared';
import Stripe from 'stripe';

export type UserDocument = mongoose.Document & {
  email: string;
  name: string;
  password: string;
  emailValidated?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  stripe?: {
    customer: {
      id: string;
      defaultSource?: {
        id: string;
        brand: string;
        lastFour: string;
      };
    };
    subscription: {
      id: string;
      status: string;
      cancelAtPeriodEnd: boolean;
      currentPeriodEnd: Date;
      trialEnd: Date;
    };
  };
  comparePassword: comparePasswordFunction;
  gravatar: (size: number) => string;
  toDto: () => UserDto;
  updateCustomer: (customer: Stripe.Customer) => UserDocument;
};

type comparePasswordFunction = (candidatePassword: string) => boolean;

export interface AuthToken {
  accessToken: string;
  kind: string;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    name: String,
    emailVerified: Boolean,
    passwordResetExpires: Date,
    stripe: {
      customer: {
        id: String,
        defaultSource: {
          id: String,
          brand: String,
          lastFour: String,
        },
      },
      subscription: {
        id: String,
        status: String,
        cancelAtPeriodEnd: String,
        currentPeriodEnd: Date,
        trialEnd: Date,
      },
    },
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

userSchema.methods.comparePassword = comparePassword;

export function createStripe(
  customer: Stripe.Customer,
  subscription: Stripe.Subscription
): StripeDto {
  return {
    customer: {
      id: customer.id,
      source: {
        id: (customer.default_source as Stripe.Card)?.id,
        brand: (customer.default_source as Stripe.Card)?.brand,
        lastFour: (customer.default_source as Stripe.Card)?.last4,
      },
    },
    subscription: {
      id: subscription.id,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      trialEnd: new Date(subscription.trial_end * 1000),
    },
  };
}

/**
 * Helper method for getting user's gravatar.
 */

const gravatarUrl = (email: string, size: number): string => {
  if (!email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

userSchema.methods.updateCustomer = function (customer: Stripe.Customer) {
  const user = this as UserDocument;
  const defaultSource = customer.default_source as Stripe.Card;
  user.stripe.customer = {
    id: customer.id,
    defaultSource: customer.default_source
      ? {
          id: defaultSource.id,
          brand: defaultSource.brand,
          lastFour: defaultSource.last4,
        }
      : null,
  };
};

userSchema.methods.gravatar = function (size: number = 200) {
  const user = (this as unknown) as UserDocument;
  return gravatarUrl(user.email, size);
};

userSchema.methods.toDto = function () {
  const user = (this as unknown) as UserDocument;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: gravatarUrl(user.email, 200),
    stripe: user.stripe,
  };
};

export const User = mongoose.model<UserDocument>('User', userSchema);
