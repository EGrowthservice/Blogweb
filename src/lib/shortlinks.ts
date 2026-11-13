import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import { Article, IArticle } from '@/models/Article';
import { ShortLink, IShortLink } from '@/models/ShortLink';

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'so', 'as', 'at',
  'by', 'for', 'from', 'in', 'into', 'of', 'off', 'on', 'onto', 'out',
  'over', 'to', 'up', 'with', 'is', 'was', 'are', 'were', 'be', 'been',
  'it', 'its', 'this', 'that', 'these', 'those', 'how', 'why', 'what',
]);

/**
 * Generates a clean, readable short code from random words of an article's title.
 * e.g., "Tim Conway’s Funniest News Desk Moments" -> "news-desk-7k3" or "conway-moments-9a2"
 */
export function generateTitleBasedShortCode(title: string): string {
  // 1. Sanitize title into lowercase alphanumeric tokens
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

export interface ShortLinkResult {
  code: string;
  shortUrl: string;
  targetUrl: string;
  articleTitle: string;
  articleSlug: string;
  category: string;
  clicks: number;
}

/**
 * Creates or retrieves a short link for a given article slug.
 */
export async function getOrCreateShortLink(
  articleSlug: string,
  regenerate = false
): Promise<ShortLinkResult | null> {
  await connectToDatabase();

  const article = await Article.findOne({ slug: articleSlug, status: 'published' }).exec();
  if (!article) return null;

  const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
  const targetUrl = `/${article.category}/${article.slug}`;

  // Check if link already exists and regenerate is false
  if (!regenerate) {
    const existing = await ShortLink.findOne({ articleSlug: article.slug }).exec();
    if (existing) {
      return {
        code: existing.code,
        shortUrl: `${siteBase}/s/${existing.code}`,
        targetUrl: existing.targetUrl,
        articleTitle: existing.articleTitle,
        articleSlug: existing.articleSlug,
        category: existing.category,
        clicks: existing.clicks,
      };
    }
  }

  // Generate a random title-based code, ensuring uniqueness
  let code = generateTitleBasedShortCode(article.title);
  let attempts = 0;
  while ((await ShortLink.exists({ code })) && attempts < 5) {
    code = generateTitleBasedShortCode(article.title);
    attempts++;
  }

  const created = await ShortLink.create({
    code,
    articleId: article._id,
    articleSlug: article.slug,
    articleTitle: article.title,
    category: article.category,
    targetUrl,
    clicks: 0,
  });

  return {
    code: created.code,
    shortUrl: `${siteBase}/s/${created.code}`,
    targetUrl: created.targetUrl,
    articleTitle: created.articleTitle,
    articleSlug: created.articleSlug,
    category: created.category,
    clicks: created.clicks,
  };
}

/**
 * Picks a random published article and generates a short link for it ("shotlink theo random title").
 */
export async function createRandomTitleShortLink(): Promise<ShortLinkResult | null> {
  await connectToDatabase();

  const count = await Article.countDocuments({ status: 'published' });
  if (count === 0) return null;

  const randomSkip = Math.floor(Math.random() * count);
  const randomArticle = await Article.findOne({ status: 'published' })
    .skip(randomSkip)
    .exec();

  if (!randomArticle) return null;

  return getOrCreateShortLink(randomArticle.slug, false);
}

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
    // Non-blocking counter update
    ShortLink.updateOne(
      { _id: link._id },
      { $inc: { clicks: 1 }, $set: { lastVisitedAt: new Date() } }
    ).exec();

    return { targetUrl: link.targetUrl, articleSlug: link.articleSlug };
  }

  // 2. Direct slug fallback if someone used full or partial slug
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

