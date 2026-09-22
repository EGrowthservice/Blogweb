import mongoose, { Schema, Document, Model } from 'mongoose';

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
  category: 'movies' | 'tv-shows' | 'celebrities' | 'music' | 'gaming';
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  author: IAuthor;
  readTimeMinutes: number;
  isFeatured: boolean;
  isTrending: boolean;
  viewsCount: number;
  likesCount: number;
  publishedAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'Entertainment Editor' },
  avatar: { type: String, required: true },
  bio: { type: String, required: true },
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
      enum: ['movies', 'tv-shows', 'celebrities', 'music', 'gaming'],
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
