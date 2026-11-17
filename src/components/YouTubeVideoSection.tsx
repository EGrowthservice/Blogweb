'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Video, ExternalLink, Sparkles, MonitorPlay } from 'lucide-react';

interface VideoTutorial {
  id: string;
  title: string;
  channel: string;
  description: string;
  tag: string;
  duration: string;
}

const FEATURED_VIDEOS: VideoTutorial[] = [
  {
    id: 'Vl0H-qTclOg',
    title: 'Microsoft Excel Complete Tutorial for Beginners (Formulas, Functions & Data Modeling)',
    channel: 'freeCodeCamp.org',
    description:
      'A comprehensive, hands-on masterclass covering Excel fundamentals, cell referencing, dynamic formulas (XLOOKUP, SUMIFS), Pivot Tables, and automated dashboard reporting.',
    tag: 'Excel & Data',
    duration: 'Full Course',
  },
  {
    id: 'oxuRxtrO2Ag',
    title: 'Beginner Guide to the Bash Terminal, Shell Commands & Automation',
    channel: 'Joe Collins (EzeeLinux)',
    description:
      'Master command-line navigation, file permissions, shell piping, and automated batch scripting for Linux, macOS, and Windows WSL.',
    tag: 'Command Line',
    duration: '45 mins',
  },
  {
    id: 'rfscVS0vtbw',
    title: 'Python Scripting & Automation Tutorial for Beginners',
    channel: 'freeCodeCamp.org',
    description:
      'Learn how to write automated scripts to process Excel spreadsheets, scrape web data, organize files, and streamline repetitive daily tasks.',
    tag: 'Automation',
    duration: 'Full Course',
  },
];

export default function YouTubeVideoSection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial>(FEATURED_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSelectVideo = (video: VideoTutorial) => {
    setSelectedVideo(video);
    // If user was already watching, smoothly play the newly selected video
    // Otherwise keep thumbnail facade for max page speed
  };

  return (
    <section className="mb-14 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Bar: White / Black / Red / Blue */}
      <div className="bg-slate-950 text-white px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold mb-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Featured Video Tutorials</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 font-display">
            <MonitorPlay className="w-6 h-6 text-red-500" />
            Watch &amp; Learn: Hands-On Tech Masterclasses
          </h2>
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-2 rounded-xl transition self-start sm:self-auto border border-white/10"
        >
          <span>Watch on YouTube</span>
          <ExternalLink className="w-3.5 h-3.5 text-red-400" />
        </a>
      </div>

      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Player Container (8 cols) with High-Performance Facade */}
          <div className="lg:col-span-8 flex flex-col">
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-900 group"
              style={{ aspectRatio: '16 / 9' }}
            >
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              ) : (
                /* High-Speed Facade: Zero blocking JS, instant render */
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label={`Play ${selectedVideo.title}`}
                  className="relative w-full h-full block text-left cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                  <Image
                    src={`https://i.ytimg.com/vi/${selectedVideo.id}/hqdefault.jpg`}
                    alt={selectedVideo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    className="object-cover group-hover:scale-105 transition duration-500 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                  {/* Red High-Impact Play Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white translate-x-0.5" />
                    </div>
                    <span className="px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold border border-white/20 shadow-md">
                      Click to Play Masterclass
                    </span>
                  </div>

                  {/* Video duration tag bottom right */}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white text-[11px] font-mono font-bold">
                    {selectedVideo.duration}
                  </div>
                </button>
              )}
            </div>

            {/* Video Meta Info */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mr-2 border border-red-200">
                  {selectedVideo.tag}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Instructor / Source: <strong className="text-slate-800">{selectedVideo.channel}</strong>
                </span>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                Duration: {selectedVideo.duration}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2 mb-1.5 leading-snug">
              {selectedVideo.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedVideo.description}
            </p>
          </div>

          {/* Right Playlist Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-red-600" />
              <span>Recommended Curriculum</span>
            </h4>

            {FEATURED_VIDEOS.map((video) => {
              const isCurrent = video.id === selectedVideo.id;
              return (
                <button
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 ${
                    isCurrent
                      ? 'bg-blue-50/80 border-blue-500 shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isCurrent
                        ? 'bg-red-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                      {video.tag}
                    </span>
                    <h5
                      className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug ${
                        isCurrent ? 'text-blue-950 font-extrabold' : 'text-slate-800'
                      }`}
                    >
                      {video.title}
                    </h5>
                    <span className="block text-[11px] text-slate-400 mt-1">
                      {video.channel} &bull; {video.duration}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Quick Practice CTA */}
            <div className="mt-2 p-4 rounded-2xl bg-slate-900 text-white text-xs border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Hands-On Practice:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Try out our free online tools to format test data, generate secure passwords, or convert text directly in your browser.
              </p>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1 font-bold text-blue-400 hover:text-blue-300 text-xs pt-1"
              >
                Open Web Tools Suite &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
