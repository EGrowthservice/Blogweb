import React from 'react';
import Link from 'next/link';
import { Mail, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { CategoryData } from '@/lib/categories';

interface FooterProps {
  categories?: CategoryData[];
}

export default function Footer({ categories = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-14 pb-8 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="group inline-flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition font-display leading-none">
                  PULSE
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-red-600 text-white ml-0.5">
                  TECH
                </span>
              </div>
              <span className="text-[9px] font-bold tracking-[0.22em] text-slate-400 uppercase mt-1">
                TIPS &amp; DIGITAL TOOLS
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Your premier destination for actionable PC optimization guides, smartphone battery tricks, advanced Excel modeling, and free browser utilities.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-slate-300">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <a href="mailto:hieucv2004@gmail.com" className="hover:text-white transition underline">
                hieucv2004@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Tutorial Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.length > 0 ? (
                categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="hover:text-blue-400 transition text-slate-300">
                      {c.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-500 text-xs">Loading categories...</li>
              )}
            </ul>
          </div>

          {/* Col 3: Online Tools Suite */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-red-500 pl-2">
              Free Online Tools
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/tools" className="hover:text-blue-400 transition font-semibold text-blue-400">
                  All Web Tools Suite →
                </Link>
              </li>
              <li>
                <Link href="/shortlink" className="hover:text-blue-400 transition">
                  ShortLink Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/text-case" className="hover:text-blue-400 transition">
                  Text Case &amp; Word Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/password-generator" className="hover:text-blue-400 transition">
                  Secure Password Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/qr-generator" className="hover:text-blue-400 transition">
                  Instant QR Code Maker
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter" className="hover:text-blue-400 transition">
                  JSON Formatter &amp; Validator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition text-slate-400">
                  Editorial Tech Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policies */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-l-2 border-slate-600 pl-2">
              Compliance &amp; Legal
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition">
                  About Editorial
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition">
                  Contact Editorial Desk
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-400 transition">
                  Privacy Policy (Google AdSense)
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-400 transition">
                  Terms of Service &amp; DMCA
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-400 transition">
                  Editorial Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {currentYear} PULSE TechTips. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-white transition">
              Terms
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white transition">
              Disclaimer
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
