import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import BackToTop from '@/components/BackToTop';
import MobileBottomNav from '@/components/MobileBottomNav';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import AdSenseScript from '@/components/ads/AdSenseScript';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://pulse-entertainment.com'),
  title: {
    default: 'PULSE Entertainment | Hollywood News, Movies, TV & Pop Culture',
    template: '%s | PULSE Entertainment',
  },
  description:
    'Your definitive cultural compass for Hollywood cinema, prestige television, celebrity spotlights, music retrospectives, and next-gen gaming.',
  keywords: [
    'Hollywood News',
    'Movie Reviews',
    'TV Shows',
    'Streaming',
    'Celebrity Fashion',
    'Met Gala',
    'Music News',
    'Gaming Reviews',
    'Oscars',
    'Pop Culture',
  ],
  authors: [{ name: 'PULSE Entertainment Editorial Board' }],
  creator: 'PULSE Entertainment Media Group',
  publisher: 'PULSE Entertainment',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pulse-entertainment.com',
    siteName: 'PULSE Entertainment',
    title: 'PULSE Entertainment | Hollywood News, Movies, TV & Pop Culture',
    description:
      'The definitive source for Hollywood cinema, prestige television, celebrity culture, music, and gaming reviews.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PULSE Entertainment | Hollywood News, Movies, TV & Pop Culture',
    description:
      'The definitive source for Hollywood cinema, prestige television, celebrity culture, music, and gaming reviews.',
    creator: '@pulse_ent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Global Website & Organization JSON-LD Schema
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://pulse-entertainment.com/#organization',
        name: 'PULSE Entertainment',
        url: 'https://pulse-entertainment.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://pulse-entertainment.com/logo.png',
        },
        sameAs: [
          'https://twitter.com/pulse_ent',
          'https://facebook.com/pulseentertainment',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://pulse-entertainment.com/#website',
        url: 'https://pulse-entertainment.com',
        name: 'PULSE Entertainment',
        publisher: {
          '@id': 'https://pulse-entertainment.com/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://pulse-entertainment.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <head>
        {/* Organization & WebSite JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-950 font-sans text-neutral-100">
        <GoogleAnalytics />
        <AdSenseScript />
        <AuthProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
