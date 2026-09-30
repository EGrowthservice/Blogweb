import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/providers/AuthProvider';
import PublicLayoutWrapper from '@/components/PublicLayoutWrapper';
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics';
import AdSenseScript from '@/components/ads/AdSenseScript';
import { getAllCategories } from '@/lib/categories';

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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pulseetm.click';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  other: {
    'google-adsense-account': 'ca-pub-3542813933597668',
  },
  alternates: {
    canonical: './',
  },
  title: {
    default: 'PULSE Entertainment | Comedy Classics & Tim Conway TV Moments',
    template: '%s | PULSE Entertainment',
  },
  description:
    'Explore timeless comedy sketches, legendary Tonight Show moments, and Tim Conway television classics.',
  keywords: [
    'PULSE Entertainment',
    'Comedy Classics',
    'Tim Conway',
    'The Carol Burnett Show',
    'Johnny Carson',
    'Tonight Show',
    'Vintage Television',
    'Harvey Korman',
    'Comedy Sketches',
  ],
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
    title: 'PULSE Entertainment | Comedy Classics & Tim Conway TV Moments',
    description:
      'Explore timeless comedy sketches, legendary Tonight Show moments, and Tim Conway television classics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PULSE Entertainment | Comedy Classics & Tim Conway TV Moments',
    description:
      'Explore timeless comedy sketches, legendary Tonight Show moments, and Tim Conway television classics.',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getAllCategories();
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-3542813933597668';

  // Global Website Schema
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'PULSE Entertainment',
        url: baseUrl,
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
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {/* Organization & WebSite JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Google AdSense Account Meta Tag */}
        <meta name="google-adsense-account" content="ca-pub-3542813933597668" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3542813933597668"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white font-sans text-gray-900">
        <Script
          id="google-adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3542813933597668"
          crossOrigin="anonymous"
        />
        <GoogleAnalytics />
        <AuthProvider>
          <PublicLayoutWrapper categories={categories}>{children}</PublicLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
