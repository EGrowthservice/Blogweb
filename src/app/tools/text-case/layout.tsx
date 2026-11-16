import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Text Case Converter & Word Counter | PULSE TechTips',
  description:
    'Free online text case converter and real-time word counter. Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and slug-case with instant reading time estimation.',
  alternates: {
    canonical: '/tools/text-case',
  },
  openGraph: {
    title: 'Free Text Case Converter & Word Counter | PULSE TechTips',
    description:
      'Real-time character, word, sentence, and paragraph counter with instant text transformation tools.',
    url: 'https://www.pulseetm.click/tools/text-case',
    siteName: 'PULSE TechTips',
    type: 'website',
  },
};

export default function TextCaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

