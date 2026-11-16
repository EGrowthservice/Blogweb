import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator (URL, WiFi, Text, Phone) | PULSE TechTips',
  description:
    'Instantly generate high-resolution QR codes for websites, Wi-Fi networks, phone numbers, and plain text. Download crystal-clear PNG images 100% free with no expiration.',
  alternates: {
    canonical: '/tools/qr-generator',
  },
  openGraph: {
    title: 'Free QR Code Generator | PULSE TechTips',
    description:
      'Generate and download static QR codes for Wi-Fi access, URLs, contact numbers, and plain text without expiring.',
    url: 'https://www.pulseetm.click/tools/qr-generator',
    siteName: 'PULSE TechTips',
    type: 'website',
  },
};

export default function QrGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

