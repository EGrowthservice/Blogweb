import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800/80 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-black font-display tracking-tighter text-white">
                PULSE
              </span>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-brand-500 uppercase">
                ENTERTAINMENT
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              The definitive cultural compass for Hollywood cinema, prestige television, celebrity spotlights, music retrospectives, and next-gen gaming. Reporting with journalistic integrity from Los Angeles and New York.
            </p>
            <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>Independent Cultural Journalism & Fact-Checked Reporting</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Coverage
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/movies" className="hover:text-brand-400 transition">
                  Movies & Box Office
                </Link>
              </li>
              <li>
                <Link href="/tv-shows" className="hover:text-brand-400 transition">
                  TV & Streaming Hits
                </Link>
              </li>
              <li>
                <Link href="/celebrities" className="hover:text-brand-400 transition">
                  Celebrity & Red Carpet
                </Link>
              </li>
              <li>
                <Link href="/music" className="hover:text-brand-400 transition">
                  Music & Soundtracks
                </Link>
              </li>
              <li>
                <Link href="/gaming" className="hover:text-brand-400 transition">
                  Gaming & Esports
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & AdSense Compliance (Crucial for AdSense) */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Legal & Transparency
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-400 transition">
                  Privacy Policy & CCPA
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-brand-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-brand-400 transition">
                  Disclaimer & DMCA
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-brand-400 transition">
                  XML Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Editorial & Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">
              Editorial Desk
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-400 transition">
                  About the Masthead
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition">
                  Contact Editors
                </Link>
              </li>
              <li>
                <Link href="/contact#press" className="hover:text-brand-400 transition">
                  Press Inquiries
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-brand-400 transition">
                  My Reading List
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense & CCPA Consumer Notice */}
        <div className="py-6 border-t border-neutral-900 text-xs text-neutral-500 leading-relaxed space-y-2">
          <p>
            <strong>AdSense & Third-Party Disclosure:</strong> PULSE Entertainment participates in digital advertising programs, including Google AdSense. Google and third-party vendors use cookies to serve ads based on a user&apos;s prior visits to this website or other websites. You may opt out of personalized advertising by visiting Google Ads Settings. California residents can exercise their privacy rights under the California Consumer Privacy Act (CCPA) via our{' '}
            <Link href="/privacy-policy" className="underline hover:text-neutral-300">
              Privacy Policy
            </Link>.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {currentYear} PULSE Entertainment Media Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" /> English (United States)
            </span>
            <span>ISSN 2994-0821 (Online)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
