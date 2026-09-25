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
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  display: 'swap',
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'https://pulse-entertainment.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'PULSE Entertainment | Hollywood News, Movies, TV & Pop Culture',
    template: '%s | PULSE Entertainment',
  },
  description:
    'Your definitive cultural compass for Hollywood cinema, prestige television, celebrity spotlights, music retrospectives, and next-gen gaming. Founded and edited by Hieu Truong.',
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
  authors: [{ name: 'Hieu Truong (Trương Hiếu)', url: `${baseUrl}/about` }],
  creator: 'Hieu Truong',
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
    url: baseUrl,
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

  // Global Website & Solo Publisher JSON-LD Schema
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#publisher-person`,
        name: 'Hieu Truong (Trương Hiếu)',
        jobTitle: 'Founder, Solo Publisher & Editor-in-Chief',
        url: `${baseUrl}/about`,
        image: 'https://lh3.googleusercontent.com/a/ACg8ocJSndp72J434Ex43jha0qklWhM3b8duc60X4ma-NSz3SQjDzg=s192-c',
        description: 'Independent cultural journalist and media analyst founded PULSE Entertainment to deliver fact-checked cinema reviews, streaming television analysis, and gaming retrospectives.',
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'PULSE Entertainment',
        url: baseUrl,
        founder: {
          '@id': `${baseUrl}/#publisher-person`,
        },
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`,
        },
        sameAs: [
          'https://twitter.com/pulse_ent',
          'https://facebook.com/pulseentertainment',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'PULSE Entertainment',
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${baseUrl}/search?q={search_term_string}`,
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
        {/* Google AdSense Verification & Auto Ads Script */}
        {adsenseId && adsenseId.startsWith('ca-pub-') && adsenseId !== 'ca-pub-0000000000000000' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-neutral-950 font-sans text-neutral-100">
        <GoogleAnalytics />
        <AuthProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
