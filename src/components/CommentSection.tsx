'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import { MessageSquare, Send, User as UserIcon } from 'lucide-react';

interface CommentItem {
  _id: string;
  articleSlug: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  articleSlug: string;
}

export default function CommentSection({ articleSlug }: CommentSectionProps) {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(articleSlug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) setComments(data.comments);
      })
      .catch((err) => console.error('Failed to load comments:', err))
      .finally(() => setIsLoading(false));
  }, [articleSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleSlug,
          content: newComment.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok && data.comment) {
        setComments([data.comment, ...comments]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-neutral-800">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-500" />
          Community Discussion ({comments.length})
        </h3>
      </div>

      {/* Comment Form or Google Login Prompt */}
      <div className="mb-10 p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800">
        {status === 'authenticated' && session?.user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={32}
                  height={32}
                  className="rounded-full ring-1 ring-brand-500"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
                  {session.user.name?.[0] || 'U'}
                </div>
              )}
              <span className="text-sm font-semibold text-neutral-200">
                Commenting as {session.user.name}
              </span>
            </div>

            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this story..."
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl p-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 resize-none"
              maxLength={1000}
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-500">
                {1000 - newComment.length} characters remaining
              </span>
              <button
                type="submit"
                disabled={isSubmitting || !newComment.trim()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Posting...' : 'Post Comment'}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="text-sm font-semibold text-white">Join the Conversation</h4>
              <p className="text-xs text-neutral-400 mt-1">
                Sign in with your Google account to post comments and discuss with fellow readers.
              </p>
            </div>
            <button
              onClick={() => signIn('google')}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white hover:bg-neutral-100 text-neutral-900 text-xs font-semibold rounded-xl shadow shrink-0 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Sign in with Google</span>
            </button>
          </div>
        )}
      </div>

      {/* Comment List */}
      {isLoading ? (
        <div className="py-8 text-center text-xs text-neutral-500">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="py-8 text-center text-xs text-neutral-500">
          No comments yet. Be the first to share your take!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c._id}
              className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/70 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {c.userImage ? (
                    <Image
                      src={c.userImage}
                      alt={c.userName}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-neutral-300">
                      {c.userName[0]}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-neutral-200">
                    {c.userName}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-500">
                  {new Date(c.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-sm text-neutral-300 pl-9 leading-relaxed">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
