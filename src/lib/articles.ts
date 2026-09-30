import { cache } from 'react';
import { connectToDatabase } from '@/lib/db';
import { Article } from '@/models/Article';
import { ArticleData } from '@/types/article';

export type { ArticleData };

// Helper to convert Mongoose doc to plain object matching ArticleData
function formatArticleDoc(doc: any): ArticleData {
  return {
    id: doc._id?.toString() || doc.id || '',
    title: doc.title || '',
    slug: doc.slug || '',
    excerpt: doc.excerpt || '',
    content: doc.content || '',
    category: doc.category || '',
    tags: doc.tags || [],
    featuredImage: doc.featuredImage || '',
    featuredImageAlt: doc.featuredImageAlt || doc.title || '',
    author: {
      name: doc.author?.name || 'Editorial Team',
      role: doc.author?.role || 'Staff Writer',
      avatar:
        doc.author?.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      bio: doc.author?.bio || 'Preserving and archiving classic television comedy.',
      twitter: doc.author?.twitter || '@pulse_ent',
    },
    readTimeMinutes: doc.readTimeMinutes || 5,
    isFeatured: Boolean(doc.isFeatured),
    isTrending: Boolean(doc.isTrending),
    viewsCount: doc.viewsCount || 0,
    likesCount: doc.likesCount || 0,
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toISOString()
      : new Date().toISOString(),
  };
}

// In-Memory Global Process Cache (persists across requests on the server)
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const memoryCache = new Map<string, CacheEntry<any>>();
const DEFAULT_TTL_MS = 60 * 1000; // 60 seconds TTL

function getFromCache<T>(key: string): T | null {
  const item = memoryCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return item.data as T;
}

function setInCache<T>(key: string, data: T, ttlMs: number = DEFAULT_TTL_MS): void {
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  });
}

export function clearArticlesCache(): void {
  memoryCache.clear();
}

/**
 * Fetch all articles directly from MongoDB database
 * Single source of truth: 0 articles in database = returns empty array []
 */
export const getAllArticles = cache(async (): Promise<ArticleData[]> => {
  const cacheKey = 'articles:all';
  const cached = getFromCache<ArticleData[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const articles = await Article.find({ status: 'published' })
        .sort({ publishedAt: -1 })
        .lean()
        .exec();

      const formatted = (articles || []).map(formatArticleDoc);
      setInCache(cacheKey, formatted);

      // Pre-warm individual slug cache
      for (const art of formatted) {
        setInCache(`articles:slug:${art.slug}`, art);
      }
      return formatted;
    }
  } catch (error) {
    console.error('Failed to fetch articles from MongoDB database:', error);
  }

  return [];
});

export const getFeaturedArticles = cache(async (): Promise<ArticleData[]> => {
  const all = await getAllArticles();
  const featured = all.filter((a) => a.isFeatured);
  return featured.length > 0 ? featured.slice(0, 3) : all.slice(0, 3);
});

export const getTrendingArticles = cache(async (): Promise<ArticleData[]> => {
  const all = await getAllArticles();
  const trending = all.filter((a) => a.isTrending);
  return trending.length > 0 ? trending.slice(0, 5) : all.slice(0, 5);
});

export const getArticlesByCategory = cache(async (category: string): Promise<ArticleData[]> => {
  const all = await getAllArticles();
  return all.filter((a) => a.category === category);
});

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleData | null> => {
  const cacheKey = `articles:slug:${slug}`;
  const cached = getFromCache<ArticleData>(cacheKey);
  if (cached) {
    return cached;
  }

  // Check if already present in all articles cache
  const allCached = getFromCache<ArticleData[]>('articles:all');
  if (allCached) {
    const foundInAll = allCached.find((a) => a.slug === slug);
    if (foundInAll) {
      setInCache(cacheKey, foundInAll);
      return foundInAll;
    }
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const article = await Article.findOne({ slug, status: 'published' }).lean().exec();
      if (article) {
        const formatted = formatArticleDoc(article);
        setInCache(cacheKey, formatted);
        return formatted;
      }
      return null;
    }
  } catch (error) {
    console.error(`Failed to fetch article slug ${slug} from MongoDB:`, error);
  }

  return null;
});

export const getRelatedArticles = cache(
  async (currentSlug: string, category: string, limit: number = 3): Promise<ArticleData[]> => {
    const all = await getAllArticles();
    return all.filter((a) => a.slug !== currentSlug && a.category === category).slice(0, limit);
  }
);

export const searchArticles = cache(async (query: string): Promise<ArticleData[]> => {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const all = await getAllArticles();
  return all.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
});
