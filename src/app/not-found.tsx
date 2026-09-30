import React from 'react';
import Link from 'next/link';
import { Home, Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-block">
          <span className="text-8xl sm:text-9xl font-black font-display text-gray-200 tracking-tighter select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-200">
              Page Not Found
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Story Not Found
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            The sketch, retrospective, or story you are looking for might have been moved, renamed, or is no longer available.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 hover:bg-blue-600 text-white font-medium text-sm transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/all-stories"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm transition border border-gray-200"
          >
            <Compass className="w-4 h-4" />
            Browse All Stories
          </Link>
        </div>
      </div>
    </div>
  );
}
