import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBookmark extends Document {
  userEmail: string;
  articleId: mongoose.Types.ObjectId;
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
  articleImage: string;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    userEmail: { type: String, required: true, index: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    articleSlug: { type: String, required: true },
    articleTitle: { type: String, required: true },
    articleCategory: { type: String, required: true },
    articleImage: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// One user can bookmark an article only once
BookmarkSchema.index({ userEmail: 1, articleSlug: 1 }, { unique: true });

export const Bookmark: Model<IBookmark> =
  mongoose.models.Bookmark || mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
