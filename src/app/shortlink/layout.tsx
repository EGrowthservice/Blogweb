import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Short URL Generator & Link Preview | PULSE TechTips',
  description:
    'Generate clean, memorable short links for tech tutorials and articles. Supports Title-Based keyword slugs and ultra-compact random alphanumeric identifiers.',
  alternates: {
    canonical: '/shortlink',
  },
  openGraph: {
    title: 'Blog Short URL Generator | PULSE TechTips',
    description:
      'Generate and preview compact short links with title keywords or random hashes for easy sharing across social platforms.',
    url: 'https://www.pulseetm.click/shortlink',
    siteName: 'PULSE TechTips',
    type: 'website',
  },
};

export default function ShortLinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

