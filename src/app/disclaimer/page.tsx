import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer & Fair Use Notice | PULSE Entertainment',
  description:
    'Editorial disclaimer, Fair Use notice under 17 U.S. Code § 107, and advertising disclosures for PULSE Entertainment.',
  alternates: {
    canonical: 'https://pulse-entertainment.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-neutral-300 space-y-8 leading-relaxed text-[15px]">
      <div>
        <span className="text-xs font-bold text-brand-500 uppercase tracking-widest">
          Editorial Disclosures
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight mt-2">
          Disclaimer & Disclosures
        </h1>
        <p className="text-xs text-neutral-400 mt-2">
          Last Updated: September 20, 2026
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Entertainment & Commentary Purpose</h2>
        <p>
          The content provided on PULSE Entertainment is published for informational, educational, and entertainment purposes only. While our editorial desk enforces strict fact-checking protocols, articles discussing industry rumors, unconfirmed casting whispers, or speculative project developments are clearly demarcated as such.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">2. Fair Use Copyright Disclaimer</h2>
        <p>
          This website may contain copyrighted material including movie stills, promotional trailers, television screenshots, and album art, the use of which has not always been specifically authorized by the copyright owner. We make such material available in our efforts to advance critical understanding of film, television, music, and interactive art.
        </p>
        <p>
          We believe this constitutes a &quot;fair use&quot; of any such copyrighted material as provided for in <strong>Section 107 of the US Copyright Law</strong>. If you wish to use copyrighted material from this site for purposes of your own that go beyond fair use, you must obtain permission from the copyright owner.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">3. Advertising & Sponsored Content (Google AdSense)</h2>
        <p>
          PULSE Entertainment displays digital advertisements served by automated networks, predominantly <strong>Google AdSense</strong>. We do not endorse, guarantee, or assume responsibility for the accuracy or reliability of any product or service offered by third-party advertisers featured on our site.
        </p>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-800">
        <h2 className="text-xl font-bold text-white">4. External Links Disclaimer</h2>
        <p>
          PULSE Entertainment may contain links to external websites that are not provided or maintained by or in any way affiliated with our newsroom. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>
      </section>
    </div>
  );
}
