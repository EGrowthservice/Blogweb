'use client';

import React, { useEffect } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  variant?: 'leaderboard' | 'in-article' | 'sidebar' | 'multiplex';
  className?: string;
}

export default function AdBanner({
  slot = '0000000000',
  format = 'auto',
  variant = 'in-article',
  className = '',
}: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isProductionAd = clientId && clientId.startsWith('ca-pub-') && clientId !== 'ca-pub-0000000000000000';

  useEffect(() => {
    if (isProductionAd && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense push error:', err);
      }
    }
  }, [isProductionAd]);

  // Dimension presets to avoid Cumulative Layout Shift (CLS)
  const getContainerStyle = () => {
    switch (variant) {
      case 'leaderboard':
        return 'min-h-[90px] max-w-[728px] mx-auto my-6';
      case 'sidebar':
        return 'min-h-[250px] w-full my-6';
      case 'in-article':
        return 'min-h-[250px] max-w-[650px] mx-auto my-8';
      case 'multiplex':
        return 'min-h-[280px] w-full my-6';
      default:
        return 'min-h-[100px] w-full my-4';
    }
  };

  return (
    <div
      className={`ad-container flex flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-neutral-800/80 bg-neutral-950/40 p-2 text-center transition-all ${getContainerStyle()} ${className}`}
    >
      <span className="text-[10px] uppercase tracking-widest text-neutral-600 mb-1 select-none font-medium">
        ADVERTISEMENT
      </span>

      {isProductionAd ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={clientId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-6 px-4 text-xs text-neutral-500 space-y-1">
          <p className="font-semibold text-neutral-400">Google AdSense Placement Slot</p>
          <p className="text-[11px] text-neutral-600">
            {variant.toUpperCase()} • Responsive Container (Zero CLS layout)
          </p>
        </div>
      )}
    </div>
  );
}
