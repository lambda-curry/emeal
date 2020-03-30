import mongoose from 'mongoose';
import { CouponDto } from '@shared';

export type CouponDocument = mongoose.Document & {
  email: string;
  projectId: string;
  projectName: string;
  title: string;
  image: string;
  description: string;
  expirationDate: Date;
  redeemedDate?: Date;

  toDto: () => CouponDto;
};

const couponSchema = new mongoose.Schema(
  {
    email: String,
    projectId: { type: mongoose.Types.ObjectId, ref: 'Project' },
    projectName: String,
    title: String,
    image: String,
    description: String,
    expirationDate: Date,
    redeemedDate: Date
  },
  { timestamps: true }
);

couponSchema.methods.toDto = function() {
  return {
    id: this.id,
    projectId: this.projectId,
    projectName: this.projectName,
    title: this.title,
    image: this.image,
    description: this.description,
    expirationDate: this.expirationDate,
    redeemedDate: this.redeemedDate
  };
};

export const Coupon = mongoose.model<CouponDocument>('Coupon', couponSchema);
