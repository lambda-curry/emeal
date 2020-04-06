import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import mongoose from 'mongoose';

export type UserDto = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type UserDocument = mongoose.Document & {
  email: string;
  name: string;
  password: string;
  emailValidated?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  subscription?: {
    id: string;
    status: string;
  };
  comparePassword: comparePasswordFunction;
  gravatar: (size: number) => string;
  toDto: () => UserDto;
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
  };
};

export const User = mongoose.model<UserDocument>('User', userSchema);
