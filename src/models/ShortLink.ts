import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IShortLink extends Document {
  code: string;
  articleId?: mongoose.Types.ObjectId;
  articleSlug: string;
  articleTitle: string;
  category: string;
  targetUrl: string;
  clicks: number;
  lastVisitedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ShortLinkSchema = new Schema<IShortLink>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      index: true,
    },
    articleSlug: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    articleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    targetUrl: {
      type: String,
      required: true,
      trim: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    lastVisitedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const ShortLink: Model<IShortLink> =
  mongoose.models.ShortLink || mongoose.model<IShortLink>('ShortLink', ShortLinkSchema);

