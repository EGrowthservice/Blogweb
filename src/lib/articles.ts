import { connectToDatabase } from '@/lib/db';
import { Article } from '@/models/Article';
import { MOCK_ARTICLES, ArticleData } from '@/data/mockArticles';

// Helper to convert Mongoose doc to plain object matching ArticleData
function formatArticleDoc(doc: any): ArticleData {
  return {
    id: doc._id?.toString() || doc.id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    category: doc.category,
    tags: doc.tags || [],
    featuredImage: doc.featuredImage,
    featuredImageAlt: doc.featuredImageAlt,
    author: {
      name: doc.author?.name || 'Editorial Team',
      role: doc.author?.role || 'Entertainment Editor',
      avatar: doc.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: doc.author?.bio || 'Pop culture journalist and entertainment contributor.',
      twitter: doc.author?.twitter,
    },
    readTimeMinutes: doc.readTimeMinutes || 5,
    isFeatured: Boolean(doc.isFeatured),
    isTrending: Boolean(doc.isTrending),
    viewsCount: doc.viewsCount || 0,
    likesCount: doc.likesCount || 0,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : new Date().toISOString(),
  };
}

export async function getAllArticles(): Promise<ArticleData[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await Article.find().sort({ publishedAt: -1 }).lean();
      if (articles.length > 0) {
        return articles.map(formatArticleDoc);
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, falling back to mock articles:', error);
  }
  return MOCK_ARTICLES;
}

export async function getFeaturedArticles(): Promise<ArticleData[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await Article.find({ isFeatured: true }).sort({ publishedAt: -1 }).limit(3).lean();
      if (articles.length > 0) {
        return articles.map(formatArticleDoc);
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, using mock data:', error);
  }
  return MOCK_ARTICLES.filter((a) => a.isFeatured);
}

export async function getTrendingArticles(): Promise<ArticleData[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await Article.find({ isTrending: true }).sort({ viewsCount: -1 }).limit(5).lean();
      if (articles.length > 0) {
        return articles.map(formatArticleDoc);
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, using mock data:', error);
  }
  return MOCK_ARTICLES.filter((a) => a.isTrending);
}

export async function getArticlesByCategory(category: string): Promise<ArticleData[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await Article.find({ category }).sort({ publishedAt: -1 }).lean();
      if (articles.length > 0) {
        return articles.map(formatArticleDoc);
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, using mock data:', error);
  }
  return MOCK_ARTICLES.filter((a) => a.category === category);
}

export async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const article = await Article.findOne({ slug }).lean();
      if (article) {
        return formatArticleDoc(article);
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, using mock data:', error);
  }
  const found = MOCK_ARTICLES.find((a) => a.slug === slug);
  return found || null;
}

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<ArticleData[]> {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await Article.find({ category, slug: { $ne: currentSlug } })
        .sort({ publishedAt: -1 })
        .limit(limit)
        .lean();
      if (articles.length > 0) {
        return articles.map(formatArticleDoc);
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, using mock data:', error);
  }
  return MOCK_ARTICLES.filter((a) => a.slug !== currentSlug && a.category === category).slice(0, limit);
}

export async function searchArticles(query: string): Promise<ArticleData[]> {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await Article.find({
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { excerpt: { $regex: q, $options: 'i' } },
          { tags: { $in: [new RegExp(q, 'i')] } },
        ],
      })
        .sort({ publishedAt: -1 })
        .lean();
      if (articles.length > 0) {
        return articles.map(formatArticleDoc);
      }
    }
  } catch (error) {
    console.warn('MongoDB query failed, using mock search:', error);
  }

  return MOCK_ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}
