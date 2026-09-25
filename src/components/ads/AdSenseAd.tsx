'use client';

import React, { useEffect, useState, useRef } from 'react';

export interface AdSenseAdProps {
  position?: 'header' | 'content' | 'sidebar' | 'footer' | 'default';
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
}

export default function AdSenseAd({
  position = 'default',
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdSenseAdProps) {
  const [config, setConfig] = useState<{
    adsenseEnabled: boolean;
    adsensePublisherId: string;
    adsenseDefaultSlot: string;
    adsenseHeaderSlot: string;
    adsenseContentSlot: string;
    adsenseSidebarSlot: string;
    adsenseFooterSlot: string;
  } | null>(null);

  const adPushed = useRef(false);

  useEffect(() => {
    fetch('/api/settings/advertising')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setConfig(json.data);
        }
      })
      .catch((err) => console.error('Failed to load AdSense configuration:', err));
  }, []);

  // Determine actual slot based on position
  const getSlotId = () => {
    if (slot) return slot;
    if (!config) return '';

    switch (position) {
      case 'header':
        return config.adsenseHeaderSlot || config.adsenseDefaultSlot;
      case 'content':
        return config.adsenseContentSlot || config.adsenseDefaultSlot;
      case 'sidebar':
        return config.adsenseSidebarSlot || config.adsenseDefaultSlot;
      case 'footer':
        return config.adsenseFooterSlot || config.adsenseDefaultSlot;
      default:
        return config.adsenseDefaultSlot;
    }
  };

  const actualSlot = getSlotId();
  const publisherId = config?.adsensePublisherId || process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
  const isEnabled = config?.adsenseEnabled ?? false;
  const isProduction =
    isEnabled && publisherId.startsWith('ca-pub-') && publisherId !== 'ca-pub-0000000000000000';

  useEffect(() => {
    if (isProduction && typeof window !== 'undefined' && !adPushed.current && actualSlot) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        adPushed.current = true;
      } catch (err) {
        console.error('AdSense display error:', err);
      }
    }
  }, [isProduction, actualSlot]);

  // Dimension presets to avoid Cumulative Layout Shift (CLS)
  const getContainerStyle = () => {
    switch (position) {
      case 'header':
        return 'min-h-[90px] max-w-[728px] mx-auto my-4';
      case 'sidebar':
        return 'min-h-[250px] w-full my-6';
      case 'content':
        return 'min-h-[250px] max-w-[650px] mx-auto my-8';
      case 'footer':
        return 'min-h-[100px] max-w-[728px] mx-auto my-6';
      default:
        return 'min-h-[100px] w-full my-4';
    }
  };

  // CRITICAL FOR ADSENSE APPROVAL:
  // If AdSense is not active with a genuine publisher ID and configured slot,
  // DO NOT render any placeholder, dashed border, or text. Return null to keep layout 100% clean.
  if (!isProduction || !actualSlot) {
    return null;
  }

  return (
    <div
      className={`ad-container flex flex-col items-center justify-center overflow-hidden rounded-xl border border-neutral-800/60 bg-neutral-950/40 p-2 text-center transition-all ${getContainerStyle()} ${className}`}
    >
      <span className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1 select-none font-medium">
        ADVERTISEMENT
      </span>

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client={publisherId}
        data-ad-slot={actualSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
