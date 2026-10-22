import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getOrCreateAdvertisingSettings } from '@/models/AdvertisingSettings';

export const dynamic = 'force-dynamic';

let cachedResponse: any = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

export async function GET() {
  const now = Date.now();
  if (cachedResponse && now - lastCacheTime < CACHE_TTL_MS) {
    return NextResponse.json(cachedResponse, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120',
      },
    });
  }

  try {
    await connectToDatabase();
    const settings = await getOrCreateAdvertisingSettings();

    const responseData = {
      success: true,
      data: {
        gaEnabled: settings.gaEnabled,
        gaMeasurementId: settings.gaMeasurementId,
        googleAdsEnabled: settings.googleAdsEnabled,
        googleAdsConversionId: settings.googleAdsConversionId,
        googleAdsConversionLabel: settings.googleAdsConversionLabel,
        adsenseEnabled: settings.adsenseEnabled,
        adsensePublisherId: settings.adsensePublisherId,
        adsenseDefaultSlot: settings.adsenseDefaultSlot,
        adsenseHeaderSlot: settings.adsenseHeaderSlot,
        adsenseContentSlot: settings.adsenseContentSlot,
        adsenseSidebarSlot: settings.adsenseSidebarSlot,
        adsenseFooterSlot: settings.adsenseFooterSlot,
        adsterraEnabled: settings.adsterraEnabled ?? false,
        gtmEnabled: settings.gtmEnabled,
        gtmContainerId: settings.gtmContainerId,
      },
    };

    cachedResponse = responseData;
    lastCacheTime = now;

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120',
      },
    });
  } catch (error: any) {
    console.error('GET /api/settings/advertising error:', error);
    // Return safe fallbacks in case DB is temporarily unreachable
    return NextResponse.json({
      success: true,
      data: {
        gaEnabled: true,
        gaMeasurementId: 'G-5F0GDVTZPE',
        googleAdsEnabled: false,
        googleAdsConversionId: '',
        googleAdsConversionLabel: '',
        adsenseEnabled: false,
        adsensePublisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-0000000000000000',
        adsenseDefaultSlot: '',
        adsenseHeaderSlot: '',
        adsenseContentSlot: '',
        adsenseSidebarSlot: '',
        adsenseFooterSlot: '',
        adsterraEnabled: false,
        gtmEnabled: false,
        gtmContainerId: '',
      },
    });
  }
}
