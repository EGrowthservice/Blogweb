'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

interface CommentItem {
  _id: string;
  articleSlug: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  articleSlug: string;
}

export default function CommentSection({ articleSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [guestName, setGuestName] = useState('Guest');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('Guest');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // Read saved guest name from localStorage if available
    try {
      const savedName = localStorage.getItem('guest_comment_name');
      if (savedName) {
        setGuestName(savedName);
        setTempName(savedName);
      }
    } catch (e) {
      // ignore
    }

    fetch(`/api/comments?slug=${encodeURIComponent(articleSlug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) setComments(data.comments);
      })
      .catch((err) => console.error('Failed to load comments:', err))
      .finally(() => setIsLoading(false));
  }, [articleSlug]);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = tempName.trim() || 'Guest';
    setGuestName(trimmed);
    setIsEditingName(false);
    try {
      localStorage.setItem('guest_comment_name', trimmed);
    } catch (e) {
      // ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleSlug,
          content: newComment.trim(),
          userName: guestName.trim() || 'Guest',
        }),
      });
      const data = await res.json();
      if (res.ok && data.comment) {
        setComments([data.comment, ...comments]);
        setNewComment('');
        setFeedback('Comment posted successfully!');
        setTimeout(() => setFeedback(null), 3500);
      } else {
        setFeedback(data.error || 'Failed to post comment.');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      setFeedback('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-700" />
          Comments <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{comments.length}</span>
        </h3>
      </div>

      {/* Comment Composer */}
      <div className="mb-8 p-5 bg-gray-50 border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Posting as</span>
            {!isEditingName ? (
              <>
                <strong className="font-semibold text-gray-900">{guestName}</strong>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="text-xs text-blue-600 hover:underline ml-1"
                >
                  Change name
                </button>
              </>
            ) : (
              <form onSubmit={handleSaveName} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Your Name"
                  maxLength={30}
                  className="px-2 py-0.5 text-xs border border-gray-300 rounded bg-white text-gray-900 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-0.5 text-xs bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempName(guestName);
                    setIsEditingName(false);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
            maxLength={2000}
            className="w-full bg-white border border-gray-300 rounded-md p-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 resize-y"
          />

          <div className="flex items-center justify-between">
            {feedback ? (
              <span className="text-xs font-medium text-emerald-600">{feedback}</span>
            ) : (
              <span className="text-xs text-gray-400">
                {2000 - newComment.length} characters left
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 text-white text-xs font-semibold rounded-md shadow-sm transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting...' : 'Post comment'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Comment List */}
      {isLoading ? (
        <div className="py-6 text-center text-xs text-gray-400">Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className="py-6 text-center text-sm text-gray-500 bg-white border border-dashed border-gray-200 rounded-lg">
          No comments yet. Be the first to share your thoughts!
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">
                    {comment.userName ? comment.userName[0].toUpperCase() : 'G'}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {comment.userName || 'Guest'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed pl-9 whitespace-pre-line">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
