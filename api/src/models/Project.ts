import mongoose from 'mongoose';
import { ProjectDto } from '@shared';

export type ProjectDocument = mongoose.Document & {
  name: string;
  website: string;
  ownerId: string;
  coupon?: {
    title: string;
    image: string;
    expirationDays?: number;
    description: string;
  };
  toDto: () => ProjectDto;
};

const projectSchema = new mongoose.Schema(
  {
    name: String,
    website: String,
    ownerId: { type: mongoose.Types.ObjectId, ref: 'User' },
    coupon: {
      title: String,
      image: String,
      expirationDays: Number,
      description: String
    },
    disabledAt: Date
  },
  { timestamps: true }
);

projectSchema.methods.toDto = function() {
  return {
    id: this.id,
    name: this.name,
    website: this.website,
    createdAt: this.createdAt
  };
};

export const Project = mongoose.model<ProjectDocument>(
  'Project',
  projectSchema
);
