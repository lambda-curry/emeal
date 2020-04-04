import mongoose from 'mongoose';

export type PageViewDocument = mongoose.Document & {
  sessionId: string;
  projectId: mongoose.Types.ObjectId;
};

const pageViewSchema = new mongoose.Schema(
  {
    sessionId: String,
    projectId: { type: mongoose.Types.ObjectId, ref: 'PageView' },
  },
  { timestamps: true }
);

export const PageView = mongoose.model<PageViewDocument>(
  'PageView',
  pageViewSchema
);
