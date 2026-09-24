import React from 'react';
import Link from 'next/link';
import { Home, Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-block">
          <span className="text-8xl sm:text-9xl font-black font-display text-neutral-800 tracking-tighter select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-500/20 text-brand-400 border border-brand-500/30 backdrop-blur-md">
              Page Not Found
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Lost in Hollywood?
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            The article, premiere, or feature you are searching for might have been moved, renamed, or is currently in production.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium text-sm transition shadow-lg shadow-brand-600/25"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/movies"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-sm border border-neutral-800 transition"
          >
            <Compass className="w-4 h-4" />
            Explore Movies
          </Link>
        </div>

        <div className="pt-8 border-t border-neutral-900 text-xs text-neutral-500 flex items-center justify-center gap-4">
          <Link href="/tv-shows" className="hover:text-neutral-300 transition">TV Shows</Link>
          <span>•</span>
          <Link href="/celebrities" className="hover:text-neutral-300 transition">Celebrities</Link>
          <span>•</span>
          <Link href="/music" className="hover:text-neutral-300 transition">Music</Link>
          <span>•</span>
          <Link href="/gaming" className="hover:text-neutral-300 transition">Gaming</Link>
        </div>
      </div>
    </div>
  );
}
