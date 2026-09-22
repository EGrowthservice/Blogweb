'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { Bookmark, Trash2, ArrowRight, BookOpen } from 'lucide-react';

interface BookmarkItem {
  _id: string;
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
  articleImage: string;
  createdAt: string;
}

export default function BookmarksPage() {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/bookmarks')
        .then((res) => res.json())
        .then((data) => {
          if (data.bookmarks) setBookmarks(data.bookmarks);
        })
        .catch((err) => console.error('Error loading bookmarks:', err))
        .finally(() => setLoading(false));
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status]);

  const handleRemove = async (articleSlug: string) => {
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleSlug }),
      });
      if (res.ok) {
        setBookmarks((prev) => prev.filter((b) => b.articleSlug !== articleSlug));
      }
    } catch (err) {
      console.error('Error removing bookmark:', err);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-neutral-400">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm">Loading your reading library...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-brand-500/10 text-brand-500 flex items-center justify-center mx-auto mb-6">
          <Bookmark className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold font-display text-white mb-3">
          Your Personal Reading Library
        </h1>
        <p className="text-neutral-400 text-sm mb-8 leading-relaxed max-w-md mx-auto">
          Sign in with your Google account to save Hollywood scoops, film reviews, and celebrity features to read whenever you want.
        </p>
        <button
          onClick={() => signIn('google')}
          className="inline-flex items-center gap-3 px-6 py-3.5 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold rounded-xl shadow-lg transition duration-150"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign In with Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-brand-500" />
            Saved Stories ({bookmarks.length})
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Articles saved under {session?.user?.email}
          </p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="py-20 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 p-8">
          <Bookmark className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No saved stories yet</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
            Browse our latest entertainment stories and click the bookmark icon to save them here.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl transition"
          >
            <span>Explore Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl hover:border-neutral-700 transition"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0 mr-4">
                {item.articleImage && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-neutral-950">
                    <Image
                      src={item.articleImage}
                      alt={item.articleTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-brand-500 tracking-wider">
                    {item.articleCategory}
                  </span>
                  <h3 className="text-sm font-semibold text-white truncate">
                    <Link
                      href={`/${item.articleCategory}/${item.articleSlug}`}
                      className="hover:text-brand-400 transition"
                    >
                      {item.articleTitle}
                    </Link>
                  </h3>
                  <span className="text-[11px] text-neutral-500">
                    Saved on {new Date(item.createdAt).toLocaleDateString('en-US')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href={`/${item.articleCategory}/${item.articleSlug}`}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-lg transition"
                >
                  Read
                </Link>
                <button
                  onClick={() => handleRemove(item.articleSlug)}
                  className="p-2 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition"
                  title="Remove from saved"
                  aria-label="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
