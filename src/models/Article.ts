import mongoose, { Schema, Document, Model } from 'mongoose';

export type PostStatus = 'draft' | 'published' | 'archived';

export interface IAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  twitter?: string;
}

export interface IArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categoryId?: mongoose.Types.ObjectId;
  authorId?: mongoose.Types.ObjectId;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  author: IAuthor;
  status: PostStatus;
  readTimeMinutes: number;
  isFeatured: boolean;
  isTrending: boolean;
  viewsCount: number;
  likesCount: number;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'Entertainment Editor' },
  avatar: { type: String, required: true, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256' },
  bio: { type: String, required: true, default: 'Content Creator & Editor' },
  twitter: { type: String },
});

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      index: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
      index: true,
    },
    tags: [{ type: String, index: true }],
    featuredImage: { type: String, required: true },
    featuredImageAlt: { type: String, required: true },
    author: { type: AuthorSchema, required: true },
    readTimeMinutes: { type: Number, default: 5 },
    isFeatured: { type: Boolean, default: false, index: true },
    isTrending: { type: Boolean, default: false, index: true },
    viewsCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose model overwrite error during hot reloads in Next.js
export const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);
