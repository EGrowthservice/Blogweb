import { NextRequest, NextResponse } from 'next/server';
import {
  getOrCreateShortLink,
  createRandomTitleShortLink,
} from '@/lib/shortlinks';
import { ShortLink } from '@/models/ShortLink';
import { connectToDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const isRandom = searchParams.get('random') === 'true';

    if (isRandom) {
      const result = await createRandomTitleShortLink();
      if (!result) {
        return NextResponse.json(
          { success: false, message: 'No published articles found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: result });
    }

    if (slug) {
      const result = await getOrCreateShortLink(slug);
      if (!result) {
        return NextResponse.json(
          { success: false, message: 'Article not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: result });
    }

    // Default: list recent shortlinks
    await connectToDatabase();
    const links = await ShortLink.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()
      .exec();

    const siteBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
    const formatted = links.map((l: any) => ({
      code: l.code,
      shortUrl: `${siteBase}/s/${l.code}`,
      targetUrl: l.targetUrl,
      articleTitle: l.articleTitle,
      articleSlug: l.articleSlug,
      category: l.category,
      clicks: l.clicks,
      createdAt: l.createdAt,
    }));

    return NextResponse.json({ success: true, data: formatted });
  } catch (error: any) {
    console.error('ShortLink GET API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { slug, random, regenerate } = body;

    if (random) {
      const result = await createRandomTitleShortLink();
      if (!result) {
        return NextResponse.json(
          { success: false, message: 'No published articles found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: result });
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Missing article slug or random flag' },
        { status: 400 }
      );
    }

    const result = await getOrCreateShortLink(slug, !!regenerate);
    if (!result) {
      return NextResponse.json(
        { success: false, message: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('ShortLink POST API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal error' },
      { status: 500 }
    );
  }
}
