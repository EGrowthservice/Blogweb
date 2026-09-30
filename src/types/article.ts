export interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featuredImageAlt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    twitter?: string;
  };
  readTimeMinutes: number;
  isFeatured: boolean;
  isTrending: boolean;
  viewsCount: number;
  likesCount: number;
  publishedAt: string | Date;
}
