'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/tracking';

interface AdvertisingConfig {
  gaEnabled: boolean;
  gaMeasurementId: string;
  googleAdsEnabled: boolean;
  googleAdsConversionId: string;
  gtmEnabled: boolean;
  gtmContainerId: string;
}

function PageViewTracker({ config }: { config: AdvertisingConfig | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!config?.gaEnabled || !config?.gaMeasurementId) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams, config]);

  return null;
}

export default function GoogleAnalytics() {
  const [config, setConfig] = useState<AdvertisingConfig | null>(null);

  // Fetch settings from public API
  useEffect(() => {
    fetch('/api/settings/advertising')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setConfig(json.data);
        }
      })
      .catch((err) => console.error('Failed to load advertising configuration:', err));
  }, []);

  if (!config) return null;

  const { gaEnabled, gaMeasurementId, googleAdsEnabled, googleAdsConversionId, gtmEnabled, gtmContainerId } = config;

  return (
    <>
      {/* Route change page view tracker inside Suspense */}
      <Suspense fallback={null}>
        <PageViewTracker config={config} />
      </Suspense>

      {/* 1. Google Tag Manager (GTM) */}
      {gtmEnabled && gtmContainerId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmContainerId}');`,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* 2. Google Analytics 4 (GA4) / Google Ads Tag */}
      {gaEnabled && gaMeasurementId && (
        <>
          <Script
            id="google-tag-manager-gtag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
                ${
                  googleAdsEnabled && googleAdsConversionId
                    ? `gtag('config', '${googleAdsConversionId.startsWith('AW-') ? googleAdsConversionId : 'AW-' + googleAdsConversionId}');`
                    : ''
                }
              `,
            }}
          />
        </>
      )}
    </>
  );
}
