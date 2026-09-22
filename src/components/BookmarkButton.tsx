'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Bookmark } from 'lucide-react';
import GoogleAuthModal from './GoogleAuthModal';

interface BookmarkButtonProps {
  articleSlug: string;
  articleTitle?: string;
  className?: string;
  showText?: boolean;
}

export default function BookmarkButton({
  articleSlug,
  articleTitle,
  className = '',
  showText = false,
}: BookmarkButtonProps) {
  const { data: session, status } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if article is bookmarked on mount
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      fetch('/api/bookmarks')
        .then((res) => res.json())
        .then((data) => {
          if (data.bookmarks && Array.isArray(data.bookmarks)) {
            const found = data.bookmarks.some((b: any) => b.articleSlug === articleSlug);
            setIsBookmarked(found);
          }
        })
        .catch((err) => console.error('Error fetching bookmark status:', err));
    }
  }, [status, session, articleSlug]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // If guest, open the Google login modal
    if (status !== 'authenticated') {
      setAuthModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleSlug }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsBookmarked(data.bookmarked);
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        disabled={isLoading}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this article'}
        title={isBookmarked ? 'Remove from Saved' : 'Save article to read later'}
        className={`inline-flex items-center gap-2 p-2 rounded-full transition ${
          isBookmarked
            ? 'text-brand-500 bg-brand-500/10 hover:bg-brand-500/20'
            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
        } ${className}`}
      >
        <Bookmark
          className={`w-4 h-4 transition transform active:scale-125 ${
            isBookmarked ? 'fill-brand-500 text-brand-500' : ''
          }`}
        />
        {showText && (
          <span className="text-xs font-medium">
            {isBookmarked ? 'Saved' : 'Save'}
          </span>
        )}
      </button>

      <GoogleAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Save for Later"
        description="Sign in with your Google account to bookmark this article and read it whenever you want."
      />
    </>
  );
}
