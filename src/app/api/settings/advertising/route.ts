import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { getOrCreateAdvertisingSettings } from '@/models/AdvertisingSettings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const settings = await getOrCreateAdvertisingSettings();

    // Only return safe public configuration
    return NextResponse.json({
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
        gtmEnabled: settings.gtmEnabled,
        gtmContainerId: settings.gtmContainerId,
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
        gtmEnabled: false,
        gtmContainerId: '',
      },
    });
  }
}
