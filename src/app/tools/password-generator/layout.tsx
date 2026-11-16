import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cryptographic Strong Password Generator | PULSE TechTips',
  description:
    'Generate cryptographically secure, high-entropy passwords with custom length, symbol inclusion, phonetic readability, and brute-force crack time estimation. 100% client-side privacy.',
  alternates: {
    canonical: '/tools/password-generator',
  },
  openGraph: {
    title: 'Cryptographic Strong Password Generator | PULSE TechTips',
    description:
      'Client-side random password creator with entropy scoring, PIN generator, and memorable passphrase synthesis.',
    url: 'https://www.pulseetm.click/tools/password-generator',
    siteName: 'PULSE TechTips',
    type: 'website',
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

