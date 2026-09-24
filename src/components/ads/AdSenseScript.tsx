'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

export default function AdSenseScript() {
  const [config, setConfig] = useState<{
    adsenseEnabled: boolean;
    adsensePublisherId: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/settings/advertising')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setConfig(json.data);
        }
      })
      .catch((err) => console.error('Failed to load AdSense script config:', err));
  }, []);

  if (!config?.adsenseEnabled || !config.adsensePublisherId || config.adsensePublisherId === 'ca-pub-0000000000000000') {
    return null;
  }

  return (
    <Script
      id="google-adsense-script"
      strategy="afterInteractive"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsensePublisherId}`}
      crossOrigin="anonymous"
    />
  );
}
