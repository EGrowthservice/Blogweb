import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-600 pt-12 pb-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-gray-900 font-display">
                CENTRAL<span className="text-blue-600 font-bold">LIVE</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Your destination for timeless comedy sketches, classic television retrospectives, and iconic Tim Conway moments.
            </p>
          </div>

          {/* Col 2: Explore */}
          <div>
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/comedy" className="hover:text-blue-600 transition">
                  Comedy Classics
                </Link>
              </li>
              <li>
                <Link href="/vintage-moments" className="hover:text-blue-600 transition">
                  Vintage Moments
                </Link>
              </li>
              <li>
                <Link href="/entertainment" className="hover:text-blue-600 transition">
                  Entertainment
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div>
            <h4 className="text-gray-900 font-bold text-xs uppercase tracking-wider mb-3">
              Topics
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/comedy" className="hover:text-blue-600 transition">
                  Tim Conway Sketches
                </Link>
              </li>
              <li>
                <Link href="/comedy" className="hover:text-blue-600 transition">
                  The Tonight Show Moments
                </Link>
              </li>
              <li>
                <Link href="/vintage-moments" className="hover:text-blue-600 transition">
                  The Carol Burnett Show
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About Editorial
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
                <Link href="/contact" className="hover:text-blue-600 transition">
                  Contact
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
          <p>© {currentYear} Central Live. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-800">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-gray-800">
              Terms
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-gray-800">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
