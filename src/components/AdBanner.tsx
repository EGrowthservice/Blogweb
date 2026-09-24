'use client';

import React from 'react';
import AdSenseAd from '@/components/ads/AdSenseAd';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  variant?: 'leaderboard' | 'in-article' | 'sidebar' | 'multiplex';
  className?: string;
}

export default function AdBanner({
  slot,
  format = 'auto',
  variant = 'in-article',
  className = '',
}: AdBannerProps) {
  const getPosition = (): 'header' | 'content' | 'sidebar' | 'default' => {
    switch (variant) {
      case 'leaderboard':
        return 'header';
      case 'in-article':
        return 'content';
      case 'sidebar':
      case 'multiplex':
        return 'sidebar';
      default:
        return 'default';
    }
  };

  return (
    <AdSenseAd
      position={getPosition()}
      slot={slot}
      format={format}
      className={className}
    />
  );
}
