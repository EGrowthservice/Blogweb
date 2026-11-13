import { NextRequest, NextResponse } from 'next/server';
import { createRandomTitleShortLink } from '@/lib/shortlinks';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shouldRedirect = searchParams.get('redirect') === 'true';

    const result = await createRandomTitleShortLink();
    if (!result) {
      return NextResponse.json(
        { success: false, message: 'No articles available' },
        { status: 404 }
      );
    }

    if (shouldRedirect) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin || 'https://www.pulseetm.click';
      return NextResponse.redirect(new URL(result.targetUrl, baseUrl), 307);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Random ShortLink API error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal error' },
      { status: 500 }
    );
  }
}
