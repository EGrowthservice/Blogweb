'use client';

import React, { useState } from 'react';
import { Film, Tv, TrendingUp, DollarSign } from 'lucide-react';

const BOX_OFFICE_DATA = [
  { rank: 1, title: 'Dune: Part Two', studio: 'Warner Bros.', weekend: '$82.5M', total: '$282.1M' },
  { rank: 2, title: 'Deadpool & Wolverine', studio: 'Marvel / Disney', weekend: '$61.2M', total: '$636.4M' },
  { rank: 3, title: 'Inside Out 2', studio: 'Pixar', weekend: '$48.0M', total: '$652.9M' },
  { rank: 4, title: 'Oppenheimer (70mm Encore)', studio: 'Universal', weekend: '$22.4M', total: '$329.8M' },
  { rank: 5, title: 'Alien: Romulus', studio: '20th Century', weekend: '$18.9M', total: '$105.3M' },
];

const STREAMING_DATA = [
  { rank: 1, title: 'The Bear (Season 3)', platform: 'Hulu / FX', hours: '1.2B mins', status: 'Top Rated' },
  { rank: 2, title: 'The Last of Us', platform: 'Max / HBO', hours: '980M mins', status: 'Emmy Winner' },
  { rank: 3, title: 'House of the Dragon S2', platform: 'Max / HBO', hours: '890M mins', status: 'Trending' },
  { rank: 4, title: 'Severance', platform: 'Apple TV+', hours: '750M mins', status: 'Binge Pick' },
  { rank: 5, title: 'Shōgun', platform: 'Hulu / FX', hours: '710M mins', status: 'Historical Record' },
];

export default function BoxOfficeWidget() {
  const [tab, setTab] = useState<'boxoffice' | 'streaming'>('boxoffice');

  return (
    <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-5 shadow-lg">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-brand-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Industry Charts
          </h3>
        </div>
        <span className="text-[10px] text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded-full">
          US Estimates
        </span>
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg bg-neutral-950 p-1 mb-4 border border-neutral-800">
        <button
          onClick={() => setTab('boxoffice')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition ${
            tab === 'boxoffice'
              ? 'bg-neutral-800 text-white shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5 text-brand-400" />
          <span>Box Office</span>
        </button>
        <button
          onClick={() => setTab('streaming')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-md transition ${
            tab === 'streaming'
              ? 'bg-neutral-800 text-white shadow'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Tv className="w-3.5 h-3.5 text-brand-400" />
          <span>US Streaming</span>
        </button>
      </div>

      {/* List */}
      {tab === 'boxoffice' ? (
        <div className="space-y-3">
          {BOX_OFFICE_DATA.map((item) => (
            <div key={item.rank} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="w-5 text-center font-bold text-neutral-500 font-display">
                  #{item.rank}
                </span>
                <div className="truncate">
                  <p className="font-semibold text-white truncate">{item.title}</p>
                  <p className="text-[10px] text-neutral-400">{item.studio}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-brand-400 font-mono">{item.weekend}</p>
                <p className="text-[10px] text-neutral-500">Cume: {item.total}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {STREAMING_DATA.map((item) => (
            <div key={item.rank} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="w-5 text-center font-bold text-neutral-500 font-display">
                  #{item.rank}
                </span>
                <div className="truncate">
                  <p className="font-semibold text-white truncate">{item.title}</p>
                  <p className="text-[10px] text-neutral-400">{item.platform}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-brand-400 font-mono">{item.hours}</p>
                <p className="text-[10px] text-neutral-500">{item.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
