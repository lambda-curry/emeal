import mongoose from 'mongoose';
import { CouponDto } from '@shared';
import { ProjectDocument } from './Project';
import moment from 'moment';
import * as uuid from 'uuid';

export type CouponDocument = mongoose.Document & {
  token: string;
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
    redeemedDate: Date,
    token: String
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

export function createCouponFromProject(
  email: string,
  project: ProjectDocument
) {
  return new Coupon({
    email,
    token: uuid.v4(),
    projectId: project.id,
    projectName: project.name,
    title: project.coupon?.title,
    image: project.coupon?.image,
    description: project.coupon?.description,
    expirationDate: moment()
      .add(project.coupon?.expirationDays || 30, 'days')
      .toDate()
  });
}
