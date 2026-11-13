'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check, Sparkles, Shuffle } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
  slug?: string;
}

export default function ShareButtons({ title, url, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [shortCopied, setShortCopied] = useState(false);
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [loadingShort, setLoadingShort] = useState(false);

  const getShareUrl = () => {
    if (url) return url;
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  };

  const handleCopyLink = () => {
    const shareUrl = getShareUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleCopyShortLink = async () => {
    if (!slug) {
      handleCopyLink();
      return;
    }

    setLoadingShort(true);
    try {
      const res = await fetch(`/api/shortlink?slug=${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (data.success && data.data?.shortUrl) {
        const fullShortUrl = data.data.shortUrl;
        setShortCode(data.data.code);
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(fullShortUrl);
          setShortCopied(true);
          setTimeout(() => setShortCopied(false), 3000);
        }
      } else {
        handleCopyLink();
      }
    } catch {
      handleCopyLink();
    } finally {
      setLoadingShort(false);
    }
  };

  const handleTwitterShare = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    const shareText = encodeURIComponent(`${title} via @PulseEnt`);
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank', 'noopener,noreferrer');
  };

  const handleRedditShare = () => {
    const shareUrl = encodeURIComponent(getShareUrl());
    const shareTitle = encodeURIComponent(title);
    window.open(`https://www.reddit.com/submit?url=${shareUrl}&title=${shareTitle}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 pb-1">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5 text-blue-600" /> Share:
      </span>

      {/* Title-Based Short Link Button */}
      {slug && (
        <button
          onClick={handleCopyShortLink}
          disabled={loadingShort}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-medium transition"
          title="Copy short link generated from title"
        >
          {shortCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">
                /s/{shortCode} copied!
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{loadingShort ? 'Generating...' : 'Short Link'}</span>
            </>
          )}
        </button>
      )}

      {/* X / Twitter */}
      <button
        onClick={handleTwitterShare}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 hover:text-black transition"
        title="Share on X"
        aria-label="Share on X"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebookShare}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 hover:text-blue-600 transition"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* Reddit */}
      <button
        onClick={handleRedditShare}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 hover:text-orange-600 transition"
        title="Share on Reddit"
        aria-label="Share on Reddit"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.56 12 8 12.56 8 13.25c0 .688.56 1.25 1.25 1.25.688 0 1.25-.562 1.25-1.25 0-.69-.562-1.25-1.25-1.25zm5.5 0c-.688 0-1.25.56-1.25 1.25 0 .688.562 1.25 1.25 1.25.69 0 1.25-.562 1.25-1.25 0-.69-.56-1.25-1.25-1.25zm-5.465 3.99a.347.347 0 0 0-.248.102.347.347 0 0 0 0 .493c.96.96 2.502.96 3.462 0a.347.347 0 0 0 0-.493.347.347 0 0 0-.492 0c-.69.69-1.81.69-2.5 0a.347.347 0 0 0-.222-.102z" />
        </svg>
      </button>

      {/* Copy standard full URL link */}
      <button
        onClick={handleCopyLink}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 hover:text-black transition"
        title="Copy Full Page URL"
        aria-label="Copy Full Page URL"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <LinkIcon className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
