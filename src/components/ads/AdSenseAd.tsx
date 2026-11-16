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
  const isDummySlot =
    !actualSlot ||
    actualSlot === '9876543210' ||
    actualSlot === '7182930415' ||
    actualSlot === '5492817364' ||
    actualSlot === '3829104756';

  const defaultClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-3542813933597668';
  const publisherId = config?.adsensePublisherId || defaultClientId;
  const isEnabled = Boolean(config?.adsenseEnabled);
  const isProduction =
    isEnabled &&
    !isDummySlot &&
    publisherId.startsWith('ca-pub-') &&
    publisherId !== 'ca-pub-0000000000000000';

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

  const getContainerStyle = () => {
    switch (position) {
      case 'header':
        return 'max-w-[728px] mx-auto my-4';
      case 'sidebar':
        return 'w-full my-6';
      case 'content':
        return 'max-w-[650px] mx-auto my-8';
      case 'footer':
        return 'max-w-[728px] mx-auto my-6';
      default:
        return 'w-full my-4';
    }
  };

  // CRITICAL FOR ADSENSE APPROVAL:
  // If AdSense is not explicitly enabled with a real configured slot,
  // NEVER render any placeholder, empty container, min-height, or "Advertisement" text.
  // Return null to keep layout 100% clean and avoid "Low value / under construction" rejection.
  if (!isProduction || !actualSlot || isDummySlot) {
    return null;
  }

  return (
    <div
      className={`ad-container flex flex-col items-center justify-center overflow-hidden rounded-md transition-all ${getContainerStyle()} ${className}`}
    >
      <div className="flex items-center justify-center mb-1 select-none">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">
          Advertisement
        </span>
      </div>

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
