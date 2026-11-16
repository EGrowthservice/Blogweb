'use client';

import React, { useState, useEffect } from 'react';

interface ArticleReactionsProps {
  articleSlug: string;
}

interface ReactionState {
  fire: number;
  popcorn: number;
  mindblown: number;
  applause: number;
}

export default function ArticleReactions({ articleSlug }: ArticleReactionsProps) {
  const storageKey = `reactions_${articleSlug}`;
  const userVoteKey = `user_vote_${articleSlug}`;

  const [reactions, setReactions] = useState<ReactionState>({
    fire: 42,
    popcorn: 68,
    mindblown: 31,
    applause: 55,
  });
  const [userVoted, setUserVoted] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setReactions(JSON.parse(saved));

      const voted = localStorage.getItem(userVoteKey);
      if (voted) setUserVoted(voted);
    } catch {
      // Ignore localStorage errors
    }
  }, [storageKey, userVoteKey]);

  const handleReact = (type: keyof ReactionState) => {
    if (userVoted === type) return;

    const updated = {
      ...reactions,
      [type]: reactions[type] + 1,
    };

    setReactions(updated);
    setUserVoted(type);

    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      localStorage.setItem(userVoteKey, type);
    } catch {
      // Ignore
    }
  };

  const reactionButtons = [
    { key: 'fire' as const, emoji: '🔥', label: 'Super Helpful' },
    { key: 'popcorn' as const, emoji: '⚡', label: 'Instant Fix' },
    { key: 'mindblown' as const, emoji: '🤯', label: 'Mind Blown' },
    { key: 'applause' as const, emoji: '👏', label: 'Brilliant' },
  ];

  return (
    <div className="my-8 p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
        Was This Guide Helpful?
      </h4>
      <p className="text-xs text-slate-400 mb-4">
        Share your reaction and let other readers know how this tutorial worked for you.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {reactionButtons.map((btn) => {
          const isSelected = userVoted === btn.key;
          return (
            <button
              key={btn.key}
              onClick={() => handleReact(btn.key)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-150 transform active:scale-95 ${
                isSelected
                  ? 'bg-brand-500/20 border-brand-500 text-white shadow-lg'
                  : 'bg-neutral-950/80 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-800/80'
              }`}
            >
              <span className="text-2xl mb-1 filter drop-shadow">{btn.emoji}</span>
              <span className="text-[11px] font-semibold">{btn.label}</span>
              <span className="text-[10px] text-neutral-400 mt-0.5">
                {reactions[btn.key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
