import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment extends Document {
  articleSlug: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
  content: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    articleSlug: { type: String, required: true, index: true },
    userName: { type: String, required: true, default: 'Guest' },
    userEmail: { type: String, required: false },
    userImage: { type: String },
    content: { type: String, required: true, maxlength: 1000 },
  },
  {
    timestamps: true,
  }
);

export const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
