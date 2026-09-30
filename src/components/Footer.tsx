import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { CategoryData } from '@/lib/categories';

interface FooterProps {
  categories?: CategoryData[];
}

export default function Footer({ categories = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 pt-12 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="group inline-flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 group-hover:text-blue-600 transition font-display leading-none">
                  PULSE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              </div>
              <span className="text-[9px] font-semibold tracking-[0.22em] text-gray-500 uppercase mt-0.5">
                ENTERTAINMENT
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Your definitive destination for timeless comedy sketches, classic television retrospectives, and iconic Tim Conway moments.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-gray-600">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <a href="mailto:hieucv2004@gmail.com" className="hover:text-blue-600 transition underline">
                hieucv2004@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2: Dynamic Categories from Database */}
          <div>
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.length > 0 ? (
                categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="hover:text-blue-600 transition">
                      {c.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-xs">No categories yet</li>
              )}
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-stories" className="hover:text-blue-600 transition">
                  All Stories
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-blue-600 transition">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About Editorial
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Website / Legal */}
          <div>
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-3">
              Website
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-600 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-600 transition">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <p>© {currentYear} PULSE Entertainment. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-gray-800">
              About
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-800">
              Contact
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-gray-800">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-gray-800">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
