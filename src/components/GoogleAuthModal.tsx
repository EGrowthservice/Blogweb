'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { X, Bookmark, MessageSquare, Sparkles } from 'lucide-react';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function GoogleAuthModal({
  isOpen,
  onClose,
  title = 'Join PULSE Entertainment',
  description = 'Sign in with your Google account to save articles, participate in discussions, and customize your entertainment feed.',
}: GoogleAuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl text-white transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-brand-500 font-semibold text-xs tracking-wider uppercase mb-3">
          <Sparkles className="w-4 h-4" />
          <span>Reader Account</span>
        </div>

        <h3 className="text-2xl font-bold font-display tracking-tight text-white mb-2">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        <div className="space-y-3 mb-6 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 text-xs text-neutral-300">
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-brand-400 shrink-0" />
            <span>Save articles to read later across all your devices</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-4 h-4 text-brand-400 shrink-0" />
            <span>Join insightful discussions on Hollywood and pop culture</span>
          </div>
        </div>

        <button
          onClick={() => signIn('google')}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white hover:bg-neutral-100 text-neutral-900 font-semibold rounded-xl shadow-lg transition duration-150 transform hover:-translate-y-0.5"
        >
          {/* Google G Logo SVG */}
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
          <span>Continue with Google</span>
        </button>

        <p className="mt-4 text-center text-xs text-neutral-500">
          By continuing, you agree to our{' '}
          <a href="/terms-of-service" className="underline hover:text-neutral-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy-policy" className="underline hover:text-neutral-300">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
