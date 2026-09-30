import { cache } from 'react';
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
      name: doc.author?.name || 'Hieu Truong',
      role: doc.author?.role || 'Founder & Solo Publisher',
      avatar: doc.author?.avatar || 'https://lh3.googleusercontent.com/a/ACg8ocJSndp72J434Ex43jha0qklWhM3b8duc60X4ma-NSz3SQjDzg=s192-c',
      bio: doc.author?.bio || 'Cultural journalist and Founder & Editor-in-Chief at PULSE Entertainment.',
      twitter: doc.author?.twitter || '@pulse_ent',
    },
    readTimeMinutes: doc.readTimeMinutes || 5,
    isFeatured: Boolean(doc.isFeatured),
    isTrending: Boolean(doc.isTrending),
    viewsCount: doc.viewsCount || 0,
    likesCount: doc.likesCount || 0,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : new Date().toISOString(),
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
 * Fetch all articles with database as single source of truth:
 * 1. Process Memory Cache (sub-millisecond)
 * 2. React Request Cache (dedupes per SSR request)
 * 3. MongoDB Atlas Query (real data from database, even if empty)
 * 4. Fallback to mock data ONLY if database connection is unavailable
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
      // MongoDB is connected: Database is the absolute source of truth!
      const articles = await Article.find().sort({ publishedAt: -1 }).lean().exec();
      const formatted = (articles || []).map(formatArticleDoc);
      setInCache(cacheKey, formatted);
      // Pre-warm individual slug cache
      for (const art of formatted) {
        setInCache(`articles:slug:${art.slug}`, art);
      }
      return formatted;
    }
  } catch (error) {
    console.warn('MongoDB query failed, falling back to mock articles:', error);
  }

  // Only fall back to seed data if database is not reachable at all
  if (!process.env.MONGODB_URI) {
    setInCache(cacheKey, MOCK_ARTICLES, 15000);
    return MOCK_ARTICLES;
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
      const article = await Article.findOne({ slug }).lean().exec();
      if (article) {
        const formatted = formatArticleDoc(article);
        setInCache(cacheKey, formatted);
        return formatted;
      }
      // If connected to DB and not found, it does NOT exist! Do not return fake mock data.
      return null;
    }
  } catch (error) {
    console.warn('MongoDB query failed:', error);
  }

  // Only check MOCK_ARTICLES if DB is completely offline
  if (!process.env.MONGODB_URI) {
    const found = MOCK_ARTICLES.find((a) => a.slug === slug);
    if (found) {
      setInCache(cacheKey, found);
      return found;
    }
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
