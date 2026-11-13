import { NextRequest, NextResponse } from 'next/server';
import {
  resolveAndTrackShortCode,
  createRandomTitleShortLink,
} from '@/lib/shortlinks';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: {
    code: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const rawCode = params.code;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin || 'https://www.pulseetm.click';

    // 1. Special case: /s/random -> redirects to a random published article
    if (rawCode.toLowerCase() === 'random') {
      const randomLink = await createRandomTitleShortLink();
      if (randomLink && randomLink.targetUrl) {
        return NextResponse.redirect(new URL(randomLink.targetUrl, baseUrl), 307);
      }
      return NextResponse.redirect(new URL('/all-stories', baseUrl), 307);
    }

    // 2. Resolve short code from database
    const resolved = await resolveAndTrackShortCode(rawCode);
    if (resolved && resolved.targetUrl) {
      return NextResponse.redirect(new URL(resolved.targetUrl, baseUrl), 307);
    }

    // 3. Fallback: redirect to all stories if code not recognized
    return NextResponse.redirect(new URL('/all-stories', baseUrl), 307);
  } catch (error) {
    console.error('ShortLink redirect error:', error);
    const fallbackBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';
    return NextResponse.redirect(new URL('/all-stories', fallbackBase), 307);
  }
}
