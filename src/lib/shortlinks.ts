import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import { Article } from '@/models/Article';
import { ShortLink } from '@/models/ShortLink';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'so', 'as', 'at',
  'by', 'for', 'from', 'in', 'into', 'of', 'off', 'on', 'onto', 'out',
  'over', 'to', 'up', 'with', 'is', 'was', 'are', 'were', 'be', 'been',
  'it', 'its', 'this', 'that', 'these', 'those', 'how', 'why', 'what',
]);

/**
 * Dạng 1: Generates a clean, readable short code from random keywords in the article's title.
 * e.g., "Tim Conway’s Funniest News Desk Moments" -> "news-desk-7k3" or "conway-moments-9a2"
 */
export function generateTitleBasedShortCode(title: string): string {
  const cleanTokens = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 3 && !STOP_WORDS.has(word));

  const randomHash = crypto.randomBytes(2).toString('hex'); // 4 hex characters

  if (cleanTokens.length === 0) {
    return `post-${randomHash}`;
  }

  if (cleanTokens.length <= 2) {
    return `${cleanTokens.join('-')}-${randomHash}`;
  }

  // Pick 2 random distinct words from the title's keywords
  const shuffled = [...cleanTokens].sort(() => Math.random() - 0.5);
  const picked = shuffled.slice(0, 2);

  return `${picked[0]}-${picked[1]}-${randomHash}`;
}

/**
 * Dạng 2: Generates a purely random alphanumeric short code.
 * e.g., "rnd-8k2m9p" or "r-4f9b2"
 */
export function generatePureRandomShortCode(): string {
  const chars = '23456789abcdefghjkmnpqrstuvwxyz';
  let randomStr = '';
  const bytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    randomStr += chars[bytes[i] % chars.length];
  }
  return `rnd-${randomStr}`;
}

export interface ShortLinkResult {
  code: string;
  shortUrl: string;
  targetUrl: string;
  articleTitle: string;
  articleSlug: string;
  category: string;
  mode: 'title' | 'random';
  clicks: number;
}

/**
 * Creates or retrieves a short link for a given article slug in either 'title' or 'random' mode.
 */
export async function getOrCreateShortLink(
  articleSlug: string,
  mode: 'title' | 'random' = 'title',
  regenerate = false
): Promise<ShortLinkResult | null> {
  await connectToDatabase();

  const article = await Article.findOne({ slug: articleSlug, status: 'published' }).exec();
  if (!article) return null;

  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
  const targetUrl = `/${article.category}/${article.slug}`;

  // If link already exists for this article and mode, and regenerate is false, return it
  if (!regenerate) {
    const existing = await ShortLink.findOne({
      articleSlug: article.slug,
      ...(mode ? { mode } : {}),
    }).sort({ createdAt: -1 }).exec();

    if (existing) {
      return {
        code: existing.code,
        shortUrl: `${siteBase}/s/${existing.code}`,
        targetUrl: existing.targetUrl,
        articleTitle: existing.articleTitle,
        articleSlug: existing.articleSlug,
        category: existing.category,
        mode: (existing.mode as 'title' | 'random') || mode,
        clicks: existing.clicks,
      };
    }
  }

  // Generate unique code based on requested mode
  let code = mode === 'random' ? generatePureRandomShortCode() : generateTitleBasedShortCode(article.title);
  let attempts = 0;
  while ((await ShortLink.exists({ code })) && attempts < 8) {
    code = mode === 'random' ? generatePureRandomShortCode() : generateTitleBasedShortCode(article.title);
    attempts++;
  }

  const created = await ShortLink.create({
    code,
    articleId: article._id,
    articleSlug: article.slug,
    articleTitle: article.title,
    category: article.category,
    targetUrl,
    mode,
    clicks: 0,
  });

  return {
    code: created.code,
    shortUrl: `${siteBase}/s/${created.code}`,
    targetUrl: created.targetUrl,
    articleTitle: created.articleTitle,
    articleSlug: created.articleSlug,
    category: created.category,
    mode: created.mode as 'title' | 'random',
    clicks: created.clicks,
  };
}

/**
 * Picks a random published article and creates a short link.
 */
export async function createRandomArticleShortLink(
  mode: 'title' | 'random' = 'title'
): Promise<ShortLinkResult | null> {
  await connectToDatabase();

  const count = await Article.countDocuments({ status: 'published' });
  if (count === 0) return null;

  const randomSkip = Math.floor(Math.random() * count);
  const randomArticle = await Article.findOne({ status: 'published' })
    .skip(randomSkip)
    .exec();

  if (!randomArticle) return null;

  return getOrCreateShortLink(randomArticle.slug, mode, false);
}

/**
 * Backwards compatibility alias for createRandomArticleShortLink.
 */
export const createRandomTitleShortLink = createRandomArticleShortLink;

/**
 * Resolves a short link code and increments its click counter.
 */
export async function resolveAndTrackShortCode(
  code: string
): Promise<{ targetUrl: string; articleSlug?: string } | null> {
  await connectToDatabase();

  const normalizedCode = code.toLowerCase().trim();

  // 1. Check ShortLink collection
  const link = await ShortLink.findOne({ code: normalizedCode }).exec();
  if (link) {
    ShortLink.updateOne(
      { _id: link._id },
      { $inc: { clicks: 1 }, $set: { lastVisitedAt: new Date() } }
    ).exec();

    return { targetUrl: link.targetUrl, articleSlug: link.articleSlug };
  }

  // 2. Fallback: direct match with slug
  const article = await Article.findOne({
    $or: [{ slug: normalizedCode }, { slug: new RegExp(`^${normalizedCode}`) }],
    status: 'published',
  }).exec();

  if (article) {
    return {
      targetUrl: `/${article.category}/${article.slug}`,
      articleSlug: article.slug,
    };
  }

  return null;
}
