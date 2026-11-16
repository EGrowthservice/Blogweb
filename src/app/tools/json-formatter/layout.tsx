import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online JSON Formatter, Minifier & Syntax Validator | PULSE TechTips',
  description:
    'Free online JSON formatter, beautifier, minifier, and RFC 8259 syntax checker. Format raw JSON with 2 or 4 spaces and detect parse errors with exact character positions.',
  alternates: {
    canonical: '/tools/json-formatter',
  },
  openGraph: {
    title: 'JSON Formatter, Minifier & Validator | PULSE TechTips',
    description:
      'Format, beautify, validate, and minify JSON data directly in your browser. Fast, private, and secure developer utility.',
    url: 'https://www.pulseetm.click/tools/json-formatter',
    siteName: 'PULSE TechTips',
    type: 'website',
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

